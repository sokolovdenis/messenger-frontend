// Константы для работы с Swagger Messenger API

const API_BASE_PATH = "http://messenger.westeurope.cloudapp.azure.com/api";

const API = { 
    sign_up : `${API_BASE_PATH}/authentication/signup`,
    sign_in : `${API_BASE_PATH}/authentication/signin`,
    get_conversations : `${API_BASE_PATH}/conversations`,
    get_users : `${API_BASE_PATH}/users`,
    get_me : `${API_BASE_PATH}/users/me`
};

export default API;