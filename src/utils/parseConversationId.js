export const parseConversationId = conversationId => {
    const participants = conversationId.split('_');

    if (participants.length === 1) {
        return participants[0];
    }

    const me = localStorage.getItem("me");
    return participants[0] === me ? participants[1] : participants[0];
};
