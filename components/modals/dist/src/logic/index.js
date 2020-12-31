import { createStructuredSelector } from "reselect";
import useObjectLink from "@rn-cantons/react-link/dist/src/useObjectLink";
import items from "./props/items";
import pop from "./actions/pop";
import add from "./actions/add";
import clear from "./actions/clear";
const calculateProps = createStructuredSelector({
    items,
    add,
    pop,
    clear,
});
const useModalLogic = () => {
    const storeLink = useObjectLink({
        items: []
    });
    return calculateProps(storeLink);
};
export default useModalLogic;
//# sourceMappingURL=index.js.map