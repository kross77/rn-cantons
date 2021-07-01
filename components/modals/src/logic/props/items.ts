import {ObjectLink} from "@rn-cantons/react-link/dist/src/useObjectLink";
import {ModalStore} from "../index";

const items  = (v: ObjectLink<ModalStore>) => v.value.items;

export default items;
