import { StaticItemModel } from "../../Dynamic/Form/utils/parseConfig";
import { Callback, Data, OneParamCallback } from "../../../utils/commonTypes";
import { FormItemConfig } from "../configs/types";
import { ObjectLink, SingleLink } from "../../../utils/linkUtils";
import { Modals } from "../../Animation/components/Modals";
export declare type ApplicationFormItem = StaticItemModel<FormItemConfig> & {
    value: any;
    selected: boolean;
    select: Callback;
    update: OneParamCallback<any>;
};
export declare type ApplicationFormItems = ApplicationFormItem[];
export declare type ApplicationState = {
    error: string | null;
    items: {
        [key: string]: any;
    };
    selectedItemKey: string | null;
};
export declare type ApplicationForm = {
    items: ApplicationFormItems;
} & {
    selectedKey: string | null;
    selectedItem?: StaticItemModel<FormItemConfig>;
    unselect: Callback;
    state: ApplicationState;
};
export declare type ApplicationFormParams = {
    items: ApplicationFormItem[];
    dataLink: ObjectLink<Data<any>>;
    stateLink: ObjectLink<ApplicationState>;
    modals: Modals;
    onFormSubmitted: () => void;
    continueLink: SingleLink<boolean>;
};
declare const useApplicationFormModel: (config: any, dataLink: any, saveAction: null | Function, onFormSubmitted: any) => ApplicationForm | null;
export default useApplicationFormModel;
