export default function throttle(func, wait) {
    let timeout = null;
    let callbackArgs = null;
    const context = this;
    const later = () => {
        func.apply(context, callbackArgs);
        timeout = null;
    };
    return () => {
        if (!timeout) {
            callbackArgs = arguments;
            timeout = setTimeout(later, wait);
        }
    };
}
//# sourceMappingURL=throttle.js.map