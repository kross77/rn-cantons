import initStaticModel from "../../Dynamic/Form/utils/parseConfig";
import { useContext, useState } from "react";
import modelSelector from "./selectors/model";
import { useObjectLink, useSingleLink } from "../../../utils/linkUtils";
import { ModalsContext } from "../../Animation/components/Modals";
const useApplicationFormModel = (config, dataLink, saveAction, onFormSubmitted) => {
    const continueLink = useSingleLink(false);
    const [staticData] = useState(initStaticModel(config));
    const modals = useContext(ModalsContext);
    const stateLink = useObjectLink({
        items: {},
        error: null,
        selectedItemKey: undefined
    });
    return modelSelector({
        items: staticData,
        dataLink,
        stateLink,
        saveAction,
        modals,
        continueLink,
        onFormSubmitted,
    });
};
export default useApplicationFormModel;
//# sourceMappingURL=index.js.map