import curry from 'lodash/curry'
import reduce from 'lodash/reduce'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import merge from 'lodash/merge'

const {keys} = Object

const chain = (...reducers) => (
  (state, action) => (
    reduce(reducers, (acc, reducer) => reducer(acc, action), state)
  )
)

export const constants = {}
const handlers = {}
const storeInitialState = {
  pending: {},
  succeeded: {},
  failed: {}
}

const addConstant = (actionType) => {
  constants[actionType] = actionType
}

const addHandler = (actionType, handler) => {
  handlers[actionType] = handler
}

const mergeInitialState = (a, b) => {
  if (isObject(b) && isObject(a)) return merge(a, b)
  if (isArray(b) && isArray(a)) return [...a, ...b]
  return b
}

const extendInitialState = (state) => {
  keys(state).forEach((key) => {
    storeInitialState[key] = mergeInitialState(storeInitialState[key], state[key])
  })
}

const setHelper = curry((set, value, type) => (state) => ({
  ...state, 
  [set]: {
    ...state[set], 
    [type]: value
  }
}))

const setPending = setHelper('pending')
const setIsPending = setPending(true)
const setNotPending = setPending(false)
const setSucceeded = setHelper('succeeded', true)
const setFailed = setHelper('failed', true)

const trimPayload = (payload) => payload.length === 1 ? payload[0] : payload

const SUCCESS = '_SUCCESS'
const FAILURE = '_FAILURE'

const createAsyncAction = (
  type,
  {
    condition,
    async, 
    sideEffect,
    paired,
    handler, 
    errorHandler, 
    initialState
  }
) => {
  addHandler(type, setIsPending(type))
  addHandler(type + SUCCESS, chain(setNotPending(type), setSucceeded(type), handler))
  addHandler(type + FAILURE, chain(setNotPending(type), setFailed(type), errorHandler || handler))

  return (...payload) => (dispatch, getState) => {
    const state = getState()
    if (state.pending[type] || !condition(...payload, state, dispatch)) return
      
    sideEffect(...payload, state)
    dispatch({type})

    return async(...payload, state, dispatch).then(
      (...payload) => dispatch({type: type + SUCCESS, payload: trimPayload(payload)}),
      (error) => dispatch({type: type + FAILURE, error})
    ).then(() => {
      paired && dispatch(paired(...payload))
    })
  }
}

const noop = () => {}
const defaultHandler = state => state

export const createAction = (
  type,
  {
    condition = () => true,
    async, 
    sideEffect = noop,
    paired,
    handler = defaultHandler, 
    errorHandler = defaultHandler, 
    initialState = {}
  }
) => {
  addConstant(type)
  extendInitialState(initialState) 

  if (async) return createAsyncAction(type, {condition, async, sideEffect, paired, handler, errorHandler, initialState})

  addHandler(type, handler)
  
  return (...payload) => (dispatch, getState) => {
    if (!condition(...payload, getState(), dispatch)) return
    sideEffect(...payload, getState())
    paired && dispatch(paired(...payload))
    return dispatch({type, payload: trimPayload(payload)})
  }
}

const reducer = (state = storeInitialState, {type, ...action}) => (
  handlers.hasOwnProperty(type) ? handlers[type](state, action) : state
)

export default reducer