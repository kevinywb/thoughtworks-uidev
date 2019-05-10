import {
    getMenuList
} from '../services/menu';

/**
 * menu model
 */
export default {
    namespace: 'menu',
    state: {
        menus: []
    },
    reducers: {
        getAll(state, {
            payload
        }) {
            return {
                ...state,
                ...{
                    menus: payload
                },
            }
        }
    },
    effects: {
        getAll: (payload) => {
            const data = getMenuList();
            return data;
        }
    }
}