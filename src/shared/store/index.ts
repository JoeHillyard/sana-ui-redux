import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import app from './app/reducer';
import reducerRegistry from './reducerRegistry';

type StoreParams = {
    initialState?: { [key: string]: any };
    middleware?: any[];
};

const combine = (reducers, initialState) => {
    if (initialState) {
        console.log(reducers, initialState);
        const reducerNames = Object.keys(reducers);
        Object.keys(initialState).forEach((item) => {
            if (!reducerNames.includes(item)) {
                reducers[item] = (state = null) => state;
            }
        });
    }
    return combineReducers(reducers);
};

// @ts-ignore
const createRootReducer = (initialState) =>
    combine({ app, ...reducerRegistry.getReducers() }, initialState);

export const configureStore = ({ initialState, middleware = [] }: StoreParams) => {
    const devtools =
        typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

    const composeEnhancers = devtools || compose;

    const store = createStore(
        createRootReducer(initialState),
        initialState,
        composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
    );

    reducerRegistry.setChangeListener(() => {
        store.replaceReducer(createRootReducer(initialState));
    });

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./index.ts', () =>
                store.replaceReducer(createRootReducer(initialState))
            );
        }
    }

    return store;
};

export default configureStore;
