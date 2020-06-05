import {useSingleLink} from "@rn-cantons/react-link";
import {useEffect} from "react";

export interface UseFirebaseCollectionLink {
    ref: any ,
    disabled: boolean,
    watchParams: any[]
}
const useFirebaseCollectionLink = (p: UseFirebaseCollectionLink) => {
    const collectionLink = useSingleLink<any>(null);
    useEffect(() => {
        if (!p.disabled) {
            p.ref.onSnapshot(s => {
                if (s) {
                    const docs = s.docs?.map(sdoc => ({...sdoc.data(), id: sdoc.id})) || undefined
                    collectionLink.set(docs)
                } else {
                    collectionLink.set({})
                }
            })
        }
    }, [p.watchParams])

    return collectionLink;
}

export default useFirebaseCollectionLink;
