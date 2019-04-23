import _ from './core';
import _path from 'path';
import Request from './request';
import Component from './component';

let _config = {
        historyTracker: false,
        providerPath: './layout/layout',
        apiBaseUrl: '/api'
    },
    _middlewares = [],
    _provider = null;

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

const _createPromiseMiddleware = () => {
    const call = (promise, next, action) => {
        promise.then(res => {
            action.payload && action.payload.callback && action.payload.callback(res);
            return next({
                ...action,
                ...{
                    payload: res
                }
            });
        });
    }
    return (store) => next => action => {
        const effects = store.getEffects();
        const key = Object.keys(effects).filter(key => key === action.type)[0];
        if (key) {
            // return _.isPromise(effects[key]) ?
            //     call(effects[key](action.payload), next, action) :
            return call(new Promise((resolve, reject) => {
                return resolve(effects[key](action.payload));
            }), next, action);
        }
        return next(action);
    }
}

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

const _combineReducers = (reducers) => {
    return (state, action) => {
        Object.keys(reducers).forEach(key => {
            if (action.type === key) {
                const newState = reducers[key](state[key], action);
                state = {
                    ...state,
                    ...newState
                }
            }
        })
        return state;
    }
}

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

const _router = (component, url) => {
    return _dynamic(`${url}`).then(m => {
        m.mountElement(component.element, true);
        if (_config.historyTracker) {
            window.location.hash = _path.resolve(url)
        }
        return m;
    });
}

const _request = (url, data, method = 'GET') => {
    return Request({
        url: `${_config.apiBaseUrl}/${url}`,
        data: data,
        method: method
    });
}

const _register = (w) => {

    w.onhashchange = () => {}

    w.onpopstate = () => {}

    w.onload = () => {}

    w.onresize = () => {}

    w.onscroll = () => {}

    w.onerror = function (msg, url, line) {}
}

class App {
    constructor() {
        _register(window);
    }

    static getApp() {
        return this.instance ? this.instance :
            this.instance = new this();
    }

    config(config) {
        _config = {
            ..._config,
            ...config
        };
        return _config;
    }

    middlewares(middlewares) {
        _middlewares.push(_createPromiseMiddleware());
        middlewares.forEach(m => {
            _middlewares.push(m);
        })
        return _middlewares;
    }

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
    _router as Router,
    _request as Request,
};