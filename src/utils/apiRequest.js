export const apiRequest = (request, method, token, body, onFulfilled, onRejected) =>
    fetch(request, {
        method,
        headers: {
            'content-type': 'application/json',
            'authorization': token ? `Bearer ${token}` : undefined,
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(response =>
        response.status === 200
            ? response.json()
            : Promise.reject(response.text())
    ).then(onFulfilled
    ).catch(promise => {
        promise.then(onRejected);
    });
