/**
 * url prefix that interacts with the services
 */
const baseUrl = '/api';

/**
 * base request
 * @param {*} url - service url
 * @param {*} req - client request
 */
const axios = async (url, req) => {
    /**
     * the fetch object is undefined in jest
     */
    // const res = await fetch(`${baseUrl}/${url}`, req);
    // if (res.ok) {
    //     return res.json();
    // }

    /**
     * use the xml http request instead
     */
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(req.method, `${baseUrl}/${url}`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(req.data);
    });

    /**
     * handle errors
     */
}

/**
 * get
 * @param {*} url - service url
 * @param {*} data - pass data
 */
const get = (url, data) => {
    const req = {
        method: 'GET'
    };
    data ? req.body = data : null;
    return axios(url, req);
}

/**
 * post
 * @param {*} url - service url 
 * @param {*} data - pass data 
 */
const post = (url, data) => {

}

/**
 * put
 * @param {*} url - service url 
 * @param {*} data - pass data 
 */
const put = (url, data) => {

}

/**
 * delete
 * @param {*} url - service url 
 * @param {*} data - pass data 
 */
const del = (url, data) => {

}

export default {
    get,
    post,
    put,
    del
};