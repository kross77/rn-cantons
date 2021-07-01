import {ObjectLink} from "@rn-cantons/react-link/dist/src/useObjectLink";
import {ModalStore} from "../index";

const updateItems = (link: ObjectLink<ModalStore>) => (items) => link.update({items})

export default updateItems;
