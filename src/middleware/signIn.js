export const SIGN_IN = 'SIGN_IN';

const signIn = store => next => action => {
    if (action.type !== SIGN_IN) {
        return next(action);
    }

    const { login, password } = action;



    fetch('http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + this.token
        },
        body: JSON.stringify({
            content: this.messageInput.current.value
        })
    });
};

export const signInAction = (payload) => ({
    type: SIGN_IN,
    payload
});

export default signIn;
