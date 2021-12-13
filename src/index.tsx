import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, Store} from "redux"
import {Provider} from "react-redux"
import thunk from 'redux-thunk'
import './App.css';
import App from './App';
import {rootReducer, RootState} from "./reducers/root.reducer";

export function configureStore(initialState?: RootState): Store<RootState> {
    const middlewares = [thunk];
    let middleware = applyMiddleware(...middlewares);

    return createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;
}

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadStore = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return configureStore();
        }
        return configureStore(JSON.parse(serializedState));
    } catch (err) {
        return configureStore();
    }
};

export const store = loadStore();

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);