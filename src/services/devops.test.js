import {
    getDevOpsList
} from './devops';

describe('service', () => {
    it('get devops list correctly', async (done) => {
        const data = await getDevOpsList();
        expect(data).toBeDefined();
        done();
    })
})