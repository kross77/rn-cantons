import {Refs} from "firebase/liveLink";


const fetchDocIdReferences = (refs: Refs, firestore: any) => async (d: any) => {
    const doc = d.data();
    const promises = Object.entries(refs).reduce(
        (acc: any, [newFieldName, [fieldName, collectionName]]: any) => {
            const referenceId = doc[fieldName];
            if (referenceId) {
                console.log({ collectionName, referenceId });
                return [
                    ...acc,
                    (async () => [
                        newFieldName,
                        await firestore()
                            .collection(collectionName)
                            .doc(referenceId)
                            .get()
                            .then((s: any) => s.data())
                    ])()
                ];
            }
            return acc;
        },
        []
    );

    const values = await Promise.all(promises);
    values.forEach(([key, value]: any) => {
        doc[key] = value;
    });
    return {id: d.id, ...doc};
};

export default fetchDocIdReferences;
