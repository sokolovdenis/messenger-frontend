const API_URL = 'http://messenger.westeurope.cloudapp.azure.com/api';

const api = {
    signIn: `${API_URL}/authentication/signin`,
    signUp: `${API_URL}/authentication/signup`,
    getConversations: `${API_URL}/conversations`,
    recvMessagesFrom: conversationId => `${API_URL}/conversations/${conversationId}/messages`,
    sendMessagesTo: conversationId => `${API_URL}/conversations/${conversationId}/messages`,
    getSelf: `${API_URL}/users/me`,
    getUserById: userId => `${API_URL}/users/${userId}`,
    getUserByName: `${API_URL}/users`,
};

export default api;
