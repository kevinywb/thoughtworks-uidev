import axios from './axios';

describe('axios', () => {
    it('axios correctly', async (done) => {
        axios.get('menus', {
            a: 1
        }).then(res => {
            expect(res.success).toBe(true);
            done();
        });
    })
});