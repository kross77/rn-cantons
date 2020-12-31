import {useSingleLink} from "@rn-cantons/react-link";
import {useEffect} from "react";

interface UseFirebaseDocumentLink {
    ref: any,
    disabled: boolean,
    watchParams: any[]
}

const useFirebaseDocumentLink = (p: UseFirebaseDocumentLink) => {
    const collectionLink = useSingleLink<any>(null);
    useEffect(() => {
        if (!p.disabled) {
            p.ref.onSnapshot(s => {
                if (s) {
                    collectionLink.set({...s.data(), id: s.id} || {})
                } else {
                    collectionLink.set({})
                }
            })
        }
    }, [p.watchParams])

    return collectionLink;
}

export default useFirebaseDocumentLink;
