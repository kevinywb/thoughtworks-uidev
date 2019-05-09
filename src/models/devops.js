import {
    getDevOpsList
} from '../services/devops';

export default {
    namespace: 'devops',
    state: {
        devops: []
    },
    reducers: {
        getAll(state, {
            payload
        }) {
            return {
                ...state,
                ...{
                    devops: payload
                },
            }
        }
    },
    effects: {
        getAll: (payload) => {
            const data = getDevOpsList();
            return data;
        }
    }
}