import devops from './devops';

describe('devops', () => {
    it('reducers correctly', () => {
        Object.values(devops.reducers).forEach(reducer => {
            reducer({}, {
                payload: {
                    a: 1
                }
            });
        })
    });

    it('effects correctly', () => {
        Object.values(devops.effects).forEach(effect => {
            effect({});
        })
    })
})