import {
    getMenuList
} from '../src/services/menu';

describe('service', () => {
    test('getMenuList', async (done) => {
        const data = await getMenuList();
        expect(data.success).toBe(true);
        done();
    })
})