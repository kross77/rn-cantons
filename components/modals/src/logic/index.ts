import {createSelector, createStructuredSelector, Selector} from "reselect";
import useObjectLink, {ObjectLink} from "@rn-cantons/react-link/dist/src/useObjectLink";
import items from "./props/items";
import pop from "./actions/pop";
import add from "./actions/add";
import clear from "./actions/clear";

interface ModalsProps {
    items: any[]
}

interface ModalsActions {
}

export type Modals = ModalsProps & ModalsActions

const calculateProps: Selector<ObjectLink<ModalStore>, Modals> = createStructuredSelector({
    items,
    add,
    pop,
    clear,
})


export interface ModalStore {
    items: any[]
}


const useModalLogic = () => {
    const storeLink = useObjectLink<ModalStore>({
        items: []
    })
    return calculateProps(storeLink);
}



export default useModalLogic;


