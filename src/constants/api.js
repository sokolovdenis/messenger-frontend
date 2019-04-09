const API_URL = 'http://messenger.westeurope.cloudapp.azure.com/api';

const api = {
    signIn: `${API_URL}/authentication/signin`,
    signUn: `${API_URL}/authentication/signup`,
    getConversations: `${API_URL}/conversations`,
    recvMessagesFromUser: userId => `${API_URL}/conversations/${userId}/messages`,
    sendMessagesToUser: userId => `${API_URL}/conversations/${userId}/messages`,
    recvMessagesFromPublic: `${API_URL}/conversations/public/messages`,
    sendMessagesToPublic: `${API_URL}/conversations/public/messages`,
    getSelf: `${API_URL}/users/me`,
    getUserById: userId => `${API_URL}/users/${userId}`,
    getUserByName: `${API_URL}/users`
};

export default api;
