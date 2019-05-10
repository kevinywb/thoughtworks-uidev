/**
 * handle error
 * @param {*} msg - error message
 */
const onError = (msg) => {
    throw new Error(msg);
};

/**
 * whether it is a string
 * @param {*} str - string
 */
const isString = (str) => {
    return typeof str === 'string';
};

/**
 * whether it is a function
 * @param {*} func - function
 */
const isFunc = (func) => {
    return typeof func === 'function';
}

/**
 * whether it is a object
 * @param {*} obj - object
 */
const isObj = (obj) => {
    return typeof obj === 'object';
}

/**
 * whether it is a empty object
 * @param {*} obj - object
 */
const isEmpty = (obj) => {
    return obj === null || JSON.stringify(obj) === '{}';
};

/**
 * whether it has children
 * @param {*} container - container element
 */
const isHasChild = (container) => {
    return !!container.firstChild;
}

/**
 * whether two objects are equal
 * @param {*} obj - object
 * @param {*} obj2 - object2
 */
const isEquals = (obj, obj2) => {
    if (typeof obj === 'object' && typeof obj2 === 'object') {
        return JSON.stringify(obj) === JSON.stringify(obj2);
    }
    return obj === obj2;
}

/**
 * Whether it is a promise object
 * @param {*} promise - promise object
 */
const isPromise = (promise) => {
    return promise && typeof promise.then === 'function';
}

/**
 * merge functions
 * @param  {...any} funcs - functions
 */
const compose = (...funcs) => {
    switch (funcs.length) {
        case 0:
            return args => args;
        case 1:
            return funcs[0];
        default:
            return funcs.reduce((a, b) => (...args) => a(b(...args)));
    }
}

/**
 * clone object
 * @param {*} obj - object 
 */
const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * freeze object
 * @param {*} obj - object
 */
const readonly = (obj) => {
    return Object.freeze(obj);
}

export default {
    onError,
    isString,
    isFunc,
    isObj,
    isEmpty,
    isHasChild,
    isEquals,
    isPromise,
    compose,
    clone,
    readonly
}