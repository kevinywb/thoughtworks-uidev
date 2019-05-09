import axios from '../framework/axios';

const getDevOpsList = () => {
    return axios.get('devops').then(res => {
        return res.data;
    })
}

export {
    getDevOpsList
}