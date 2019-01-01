
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import movies from './reducers/movies'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //Store cretion
  const store = createStore(
    movies,
    composeEnhancers(applyMiddleware(thunk))
  )
  return store
}