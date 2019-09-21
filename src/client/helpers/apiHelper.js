import CONSTANT from '../Constant';

function postPayload(data) {
    return {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header,
    }
}

function postData(url = '', data = {}) {
    return fetch(url, postPayload(data))
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
}

export function submitGameGen(data) {
    let payload = postPayload(data);
    fetch(CONSTANT.GAME_GEN_ENDPOINT, payload)
        .then((response) => {
            return response.blob().then(blob => blob);
        }).then(file => {
            let fileUrl = URL.createObjectURL(file);
            window.location = fileUrl;
            return fileUrl;
        })
}