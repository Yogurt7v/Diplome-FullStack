// import {createStore, combineReducers, applyMiddleware, compose} from "redux";
// import {thunk} from "redux-thunk";
// import {appReducer, 
//     userReducer,
//         busketReducer} from "./reducers"


// const reducer = combineReducers({
//     app: appReducer,
//     user: userReducer,
//     busket: busketReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export default store



import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/appSlice'
import userSlice from './slices/userSlice'
import busketSlice from './slices/busketSlice'
import productsSlice from './slices/productsSlice'
import allUsersSlice from './slices/allUsersSlice'

export default configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    busket: busketSlice,
    products: productsSlice,
    allUsers: allUsersSlice
  },
})