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

export function getData(url = API_URL, args = {}) {
    url = new URL(url)
    if(args) {
        url.search = new URLSearchParams(args).toString();
    }
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    }).then(response => response.json()).catch(console.error);
}

export function postData(url = API_URL, data = {}) {
    return fetch(url, postPayload(data))
        .then(response => response.json()).catch(console.error);// parses JSON response into native JavaScript objects 
}

export function deleteData(url = API_URL, data = {}) {
    return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    }).then(response => response.json()).catch(console.error); // parses JSON response into native JavaScript objects 
}

export function submitGameGen(data, cb) {
    let payload = postPayload(data);
    fetch(CONSTANT.GAME_GEN_ENDPOINT, payload)
        .then((response) => {            
            if(response.headers.get('Content-Type') === 'application/zip') {
                console.log(response)
                for (let  header of response.headers) {
                    console.log(header)
                }

                return response.blob().then(blob => blob);
            }
        }).then(file => {
            if(file) {
                cb();
                let fileUrl = URL.createObjectURL(file);
                window.location = fileUrl;
                return fileUrl;
            } else {
                throw 'Error occured during game generation'
            }   
        }).catch(e => {
            console.error(e);
            throw e;
        })
}