import core from './core';

describe('core', () => {

    it('trigger error correctly', () => {
        expect(() => {
            core.onError('throw exception')
        }).toThrow('throw exception');
    })

    it('whether it is a string', () => {
        expect(core.isString('hello')).toBe(true);
        expect(core.isString(123)).toBe(false);
        expect(core.isString({})).toBe(false);
        expect(core.isString()).toBe(false);
    });

    it('whether it is a function', () => {
        expect(core.isFunc(() => {})).toBe(true);
        expect(core.isFunc({})).toBe(false);
    })

    it('whether it is a object', () => {
        expect(core.isObj({})).toBe(true);
        expect(core.isObj(123)).toBe(false);
    })

    it('whether it has children', () => {
        const parent = document.createElement('div'),
            child = document.createElement('div');
        expect(core.isHasChild(parent)).toBe(false);
        parent.appendChild(child);
        expect(core.isHasChild(parent)).toBe(true);
    })

    it('whether two objects are equal', () => {
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

    it('Whether it is a promise object', () => {
        expect(core.isPromise(new Promise(() => {}))).toBe(true);
        expect(core.isPromise({})).toBe(false);
    })

    it('compose correctly', () => {
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

    it('clone correctly', () => {
        const obj = {
                a: 1
            },
            obj2 = core.clone(obj);
        obj2.a = 2;
        expect(obj.a).toEqual(1);
    })

    it('cannot edit', () => {
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