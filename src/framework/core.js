const onError = (msg) => {
    throw new Error(msg);
};

const isString = (str) => {
    return typeof str === 'string';
};

const isFunc = (func) => {
    return typeof func === 'function';
}

const isObj = (obj) => {
    return typeof obj === 'object';
}

const isHasChild = (container) => {
    return !!container.firstChild;
}

const isEquals = (val, val2) => {
    if (typeof val === 'object' && typeof val2 === 'object') {
        return JSON.stringify(val) === JSON.stringify(val2);
    }
    return val === val2;
}

const isPromise = (promise) => {
    return promise && typeof promise.then === 'function';
}

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

const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

const readonly = (obj) => {
    return Object.freeze(obj);
}

export default {
    onError,
    isString,
    isFunc,
    isObj,
    isHasChild,
    isEquals,
    isPromise,
    compose,
    clone,
    readonly
}