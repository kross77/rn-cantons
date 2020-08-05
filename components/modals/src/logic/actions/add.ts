import {ObjectLink} from "@rn-cantons/react-link/dist/src/useObjectLink";
import {ModalStore} from "../index";

const add = (v: ObjectLink<ModalStore>) => (item: any, onClose: Function) => {
    if(onClose){
        v.update({items: [...v.value.items, () => ({item, onClose})]})
    }else{
        v.update({items: [...v.value.items, item]})
    }
};

export default add;
