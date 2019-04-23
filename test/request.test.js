import request from '../src/framework/request';

describe('request', () => {
    test('request', async (done) => {
        request({
            url: `/api/menus`,
            data: {},
            method: 'GET'
        }).then(res => {
            expect(res.success).toBe(true);
            done();
        })
    })
});