export const getErrorMessage = response => {
    try {
        const {errors} = JSON.parse(response);

        let messages = [];

        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                messages = [...messages, ...errors[key]];
            }
        }

        return messages.join(' ');
    } catch {
        return response;
    }
};
