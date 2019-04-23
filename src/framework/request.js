const request = (state) => {
    const props = {
        method: 'GET',
        url: '',
        async: true,
        dataType: 'json',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        data: '',
        ...state
    }
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(props.method, props.url, props.async);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        for (let key in props.headers) {
            xhr.setRequestHeader(key, props.headers[key]);
        }
        xhr.send(props.data);
    })
};

export default request;