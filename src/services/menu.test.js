import {
    getMenuList
} from './menu';

describe('service', () => {
    it('get menu list correctly', async (done) => {
        const data = await getMenuList();
        expect(data).toBeDefined();
        done();
    })
})