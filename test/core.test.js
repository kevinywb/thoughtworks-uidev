import core from '../src/framework/core';

describe('core', () => {

    test('onError', () => {
        expect(() => {
            core.onError('throw exception')
        }).toThrow('throw exception');
    })

    test('isString', () => {
        expect(core.isString('hello')).toBe(true);
        expect(core.isString(123)).toBe(false);
        expect(core.isString({})).toBe(false);
        ``
        expect(core.isString()).toBe(false);
    });

    test('isFunc', () => {
        expect(core.isFunc(() => {})).toBe(true);
        expect(core.isFunc({})).toBe(false);
    })

    test('isObj', () => {
        expect(core.isObj({})).toBe(true);
        expect(core.isObj(123)).toBe(false);
    })

    test('isHasChild', () => {
        const parent = document.createElement('div'),
            child = document.createElement('div');
        expect(core.isHasChild(parent)).toBe(false);
        parent.appendChild(child);
        expect(core.isHasChild(parent)).toBe(true);
    })

    test('isEquals', () => {
        expect(core.isEquals({
            a: 1
        }, {
            a: 1
        })).toBe(true);
        expect(core.isEquals({
            a: 1
        }, {
            a: 2
        })).toBe(false);
        expect(core.isEquals(1, 2)).toBe(false);
    })

    test('Whether it is a promise object', () => {
        expect(core.isPromise(new Promise(() => {}))).toBe(true);
        expect(core.isPromise({})).toBe(false);
    })

    test('compose', () => {
        const f = a => b => {
                return a(b);
            },
            funcs = [];
        expect(core.compose(...funcs)).toBeDefined();
        funcs.push(f);
        expect(core.compose(...funcs)).toBeDefined();
        funcs.push(f);
        expect(core.compose(...funcs)(f)).toBeDefined();
    })

    test('clone', () => {
        const obj = {
                a: 1
            },
            obj2 = core.clone(obj);
        obj2.a = 2;
        expect(obj.a).toEqual(1);
    })

    test('readonly', () => {
        const obj = core.readonly({
            a: 1
        });
        expect(() => {
            obj.a = 2
        }).toThrowError();
        expect(() => {
            obj.b = 1
        }).toThrowError();
    })
});