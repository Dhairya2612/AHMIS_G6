// store.js
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Import your root reducer
import thunk from 'redux-thunk'; // Example middleware

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
