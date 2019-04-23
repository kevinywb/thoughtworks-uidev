import {
    getMenuList
} from '../services/menu';

export default {
    namespace: 'menu',
    state: {
        menus: [],
        other: []
    },
    reducers: {
        getAll(state, {
            payload
        }) {
            if (payload.success) {
                return {
                    ...state,
                    ...{
                        menus: payload.data
                    },
                }
            }
        },
        getOther(state, {
            payload
        }) {
            return {
                ...state,
                ...{
                    other: payload
                },
            };
        }
    },
    effects: {
        getAll: async (params) => {
            const res = await getMenuList();
            return res;
        },
        getOther: () => {
            return 'test';
        }
    }
}