import axios from '../framework/axios';

/**
 * get devops list
 */
const getDevOpsList = () => {
    return axios.get('devops').then(res => {
        return res.data;
    })
}

export {
    getDevOpsList
}