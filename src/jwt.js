const AUTH_TOKEN_KEY = "authToken";

export function setAuthToken(authToken) {
    sessionStorage.setItem(AUTH_TOKEN_KEY, authToken);
}

export function getAuthToken() {
    let authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if( !authToken || authToken === "" ) {
        console.log("Auth token not provided");
    } else {
        return authToken;
    }
}

export function removeAuthToken() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
}
