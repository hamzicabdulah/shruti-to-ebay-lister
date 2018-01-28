import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { App } from './components/App';
import { usersActions } from './actions/usersActions';
import { rootReducer } from './reducers/rootReducer';
import { Store } from "redux";

const initialState: any = undefined;

const store: Store<any> = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, reduxImmutableStateInvariant())
);

store.dispatch(usersActions.getAllUsers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);