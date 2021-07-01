const fetchDocReferences = async (d: any) => {
    const doc = d.data();
    const promises = Object.keys(doc).reduce((acc: any, key) => {
        const reference = doc[key];
        if (typeof reference === "object" && reference.get !== undefined) {
            return [...acc, (async () => [key, await reference.get()])()];
        }
        return acc;
    }, []);

    const values = await Promise.all(promises);
    const docs = Object.keys(doc).reduce((d, key) => {
        const value: any = values && values.find((v: any) => (v ? v[0] === key : false));
        if (value) {
            let r = value[1];
            const data = r.data();

            d[key] = { id: r.id, ...data };
        }
        return d;
    }, doc);
    return {...docs, id: d.id};
};

export default fetchDocReferences;

