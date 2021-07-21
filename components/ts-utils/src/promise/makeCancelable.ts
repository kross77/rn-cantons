interface CancelPromise<T> extends Promise<T>{
    cancel: () => void
}

const makeCancelable = <T>(promise: Promise<T>):CancelPromise<T> => {
    let rejectFn: any;

    const wrappedPromise: CancelPromise<T> = new Promise<T>((resolve, reject) => {
        rejectFn = reject;

        Promise.resolve(promise)
            .then(resolve)
            .catch(reject);
    }) as CancelPromise<T>;

    wrappedPromise.cancel = () => {
        rejectFn({ canceled: true });
    };

    return wrappedPromise;
};

export default makeCancelable