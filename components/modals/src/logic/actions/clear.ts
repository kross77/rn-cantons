import {ObjectLink} from "@rn-cantons/react-link/dist/src/useObjectLink";
import {ModalStore} from "../index";

const clear = (link: ObjectLink<ModalStore>) => () => {
    link.update({items: []})
};

export default clear;
