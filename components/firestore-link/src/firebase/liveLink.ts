import {useObjectLink, useSingleLink} from "@kross77/react-link";
import {useEffect} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import fetchDocIdReferences from "./fetchDocIdReferencies";
import fetchDocReferences from "./fetchDocReferencies";

type Ref = [string, string]

export interface Refs {
    [key: string]: Ref
}

const useFirestoreLink = <T extends any>(firestore: any, colName: string, refs: Ref | null = null) => {
    const [col, loading, error] = useCollection(
        firestore().collection(colName)
    );

    const dataLink = useSingleLink<any>(null);

    useEffect(() => {
        if (col) {
            Promise.all(
                //@ts-ignore
                col.docs.map(refs ? fetchDocIdReferences(refs, firestore) : fetchDocReferences)
            ).then(dataLink.set);
        }
    }, [col]);
    //@ts-ignore
    const editItem = useObjectLink<T & {id?: string}>({});

    return {
        editItem,
        value: editItem.value,
        data: dataLink.value,
        loading,
        error,
        add: () => {
            if (editItem.value) {
                firestore()
                    .collection(colName)
                    .add(editItem.value);
                editItem.set({});
            }
        },
        load: (id: string) => {
                 firestore()
                    .collection(colName)
                    .doc(id)
                    .get()
                    .then((s: any) => {
                        const data = s.data();
                        console.log('load', {data})
                        editItem.set({...data, id: s.id});
                    });
        },
        save: () => {
            const item: any = editItem.value;
            if (item.id) {
                firestore()
                    .collection(colName)
                    .doc(item.id)
                    .set(item, {merge: true});
            } else {
                console.log('save', {item})
                firestore()
                    .collection(colName)
                    .add(item)
                    .then((s: any) => editItem.update({id: s.id}));
            }
        },
        delete: (id?: string) => {
            const itemId = id || editItem.value.id;
            if (itemId) {
                return firestore()
                    .collection(colName)
                    .doc(editItem.value.id)
                    .delete()
            } else {
                console.error(`Could't remove item, because editItem.value.id or id is not set`)
            }

        }
    };
};


export default useFirestoreLink;
