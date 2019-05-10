import _ from './core';
import _path from 'path';
import Component from './component';

/**
 * common configuration
 */
let _config = {
        historyTracker: false,
        providerPath: './layout/layout'
    },
    _middlewares = [],
    _provider = null;

/**
 * dynamic load modules
 * @param {*} path - file path
 */
const _dynamic = (path) => {
    const arr = path.split('/'),
        name = arr[arr.length - 1];
    arr.splice(0, 1);
    arr.splice(arr.length - 1, 1);
    path = arr.join('/');
    return import(`../${path}/${name}`).then(m => {
        return m.default;
    });
}

/**
 * create a store to manage the state of components
 * @param {*} reducer - used to reconstruct a new state
 * @param {*} preloadedStore - unprocessed and original state
 * @param {*} enhancer - extend more advanced intermediate state logic
 */
const _createStore = (reducer, preloadedStore, enhancer) => {
    if (_.isFunc(enhancer)) {
        return enhancer(_createStore)(reducer, preloadedStore);
    }
    const store = {
        state: {},
        effects: {},
        listeners: [],
        ...preloadedStore
    };
    const getState = () => {
        return store.state;
    };
    const getEffects = () => {
        return store.effects;
    };
    const subsribe = (lisener) => {
        store.listeners.push(lisener);
    };
    const dispatch = (action) => {
        store.state = reducer(store.state, action);
        store.listeners.forEach(listener => {
            listener();
        });
        return action;
    };
    return {
        getState,
        getEffects,
        subsribe,
        dispatch
    }
};

/**
 * construct a middleware that handles asynchronous functions
 */
const _createPromiseMiddleware = () => {
    const call = (promise, next, action) => {
        promise.then(data => {
            action.payload = data;
            return next(action);
        });
    }
    return (store) => next => action => {
        const effects = store.getEffects();
        const key = Object.keys(effects).find(key => key === action.type);
        if (key) {
            // return _.isPromise(effects[key]) ?
            //     call(effects[key](action.payload), next, action) :
            return call(new Promise((resolve, reject) => {
                resolve(effects[key](action.payload));
            }), next, action);
        }
        return next(action);
    }
}

/**
 * register middlewares
 * @param  {...any} middlewares - follow the 'store => next => action' function rules
 */
const _applyMiddleware = (...middlewares) => {
    return (createStore) => (reducer, preloadedStore, enhancer) => {
        const store = createStore(reducer, preloadedStore, enhancer);
        let dispatch = store.dispatch;
        let chain = [];
        const api = {
            getState: store.getState,
            getEffects: store.getEffects,
            dispatch: dispatch
        };
        chain = middlewares.map(middleware => middleware(api));
        dispatch = _.compose(...chain)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}

/**
 * merge the reducers
 * @param {*} reducers - a reducer set
 */
const _combineReducers = (reducers) => {
    return (state, action) => {
        Object.keys(reducers).forEach(key => {
            if (action.type === key) {
                const newState = reducers[key](state[key], action);
                if (_.isEmpty(newState)) return;
                state = {
                    ...state,
                    ...newState
                }
            }
        })
        return state;
    }
}

/**
 * create a container component that connect components and states
 * @param {*} model - management of state
 * @param {*} children - management of element
 * @param {*} state - orginal state
 */
const _connect = (model, children, state) => (thisComponent) => {
    const component = new thisComponent(state);
    if (model && model.length > 0) {
        let state,
            reducers = {},
            effects = {};
        model.forEach(m => {
            state = {
                ...component.state,
                ...m.state
            }
            Object.keys(m.reducers).forEach(key => {
                reducers[`${m.namespace}/${key}`] = m.reducers[key];
            });
            Object.keys(m.effects).forEach(key => {
                effects[`${m.namespace}/${key}`] = m.effects[key];
            });
        })
        let store = _createStore(_combineReducers(reducers), {
            state: state,
            effects: effects
        }, _.compose(_applyMiddleware(..._middlewares)));
        // window && window.devToolsExtension ? window.devToolsExtension : f => f));
        store.subsribe(() => {
            component.setState(store.getState());
        });
        // component.context = store;
        component.dispatch = store.dispatch;
    }
    component.componentWillMount();
    component.renderDOM(children);
    component.componentDidMount();
    return component;
}

/**
 * normal component wrapper
 * @param {*} state - orginal state
 */
const _create = (state) => (thisComponent) => {
    const component = new thisComponent(state);
    component.state = {
        ...component.state,
        ...state
    }
    component.componentWillMount();
    component.renderDOM();
    component.componentDidMount();
    return component;
}

/**
 * dynamic routing
 * @param {*} component - container component
 * @param {*} url - target component path
 */
const _router = (component, url) => {
    return _dynamic(`${url}`).then(m => {
        m.mountElement(component.element, true);
        if (_config.historyTracker) {
            window.location.hash = _path.resolve(url)
        }
        return m;
    });
}

/**
 * monitor global window event
 * @param {*} w - global window 
 */
const _register = (w) => {

    w.onhashchange = () => {}

    w.onpopstate = () => {}

    w.onload = () => {}

    w.onresize = () => {}

    w.onscroll = () => {}

    w.onerror = function (msg, url, line) {}
}

/**
 * app class
 */
class App {
    constructor() {
        _register(window);
    }

    /**
     * singleton
     */
    static getApp() {
        return this.instance ? this.instance :
            this.instance = new this();
    }

    /**
     * set configuration
     * @param {*} config - initial configuration
     */
    config(config) {
        _config = {
            ..._config,
            ...config
        };
        return _config;
    }

    /**
     * set middlewares
     * @param {*} middlewares - middleware arrays follow the 'store => next => action' function rules
     */
    middlewares(middlewares) {
        _middlewares.push(_createPromiseMiddleware());
        middlewares.forEach(m => {
            _middlewares.push(m);
        })
        return _middlewares;
    }

    /**
     * mount the app instance on the document
     * @param {*} container - root element
     */
    start(container) {
        return _dynamic(_config.providerPath).then(m => {
            const rootContainer = document.querySelector(container);
            m.mountElement(rootContainer);
            _provider = m;
            return m;
        });
    }
}

export {
    App,
    Component,
    _provider as Provider,
    _connect as Connect,
    _create as Create,
    _router as Router
};