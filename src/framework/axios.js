/**
 * axios
 */
const baseUrl = '/api';

const axios = async (url, req) => {
    // const res = await fetch(`${baseUrl}/${url}`, req);
    // if (res.ok) {
    //     return res.json();
    // }
    //handle errors
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(req.method, `${baseUrl}/${url}`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(req.data);
    })
}

const get = (url, data) => {
    const req = {
        method: 'GET'
    };
    data ? req.body = data : null;
    return axios(url, req);
}

const post = (url, data) => {

}

const put = (url, data) => {

}

const del = (url, data) => {

}

export default {
    get,
    post,
    put,
    del
};