export const formatTimestamp = timestamp =>
    new Date(timestamp).toLocaleString("ru", {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
