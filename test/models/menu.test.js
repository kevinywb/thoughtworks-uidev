import menu from '../../src/models/menu';

describe('menu', () => {
    it('reducers correctly', () => {
        Object.values(menu.reducers).forEach(reducer => {
            reducer({}, {
                payload: {
                    a: 1
                }
            });
        })
    });

    it('effects correctly', () => {
        Object.values(menu.effects).forEach(effect => {
            effect({});
        })
    })
})