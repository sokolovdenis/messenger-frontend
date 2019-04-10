export const debounce = (func, ms) => {

    let timer = null;

    return function (...args) {
        const onComplete = () => {
            func.apply(this, args);
            timer = null;
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(onComplete, ms);
    };
};
