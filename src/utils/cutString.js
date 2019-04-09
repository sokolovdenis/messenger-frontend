const PREVIEW_LENGTH = 32;
const STOPS_COUNT = 3;
const FULL_STOP = ".";

export const cutString = string => {
    const stopsFirstIndex = string.length - STOPS_COUNT;

    if (stopsFirstIndex + STOPS_COUNT < PREVIEW_LENGTH) {
        return string;
    }

    return `${string.substr(0, PREVIEW_LENGTH - STOPS_COUNT)}${FULL_STOP.repeat(STOPS_COUNT)}`;
};
