import initStaticModel, {
  StaticItemModel
} from "../../Dynamic/Form/utils/parseConfig";
import {useContext, useState} from "react";
import {
  Callback,
  Collection,
  Data,
  OneParamCallback
} from "../../../utils/commonTypes";
import { FormItemConfig } from "../configs/types";
import modelSelector from "./selectors/model";
import {ObjectLink, SingleLink, useObjectLink, useSingleLink} from "../../../utils/linkUtils";
import {ModalsContext, Modals} from "../../Animation/components/Modals";

export type ApplicationFormItem = StaticItemModel<FormItemConfig> & {
  value: any;
  selected: boolean;
  select: Callback;
  update: OneParamCallback<any>;
};

export type ApplicationFormItems = ApplicationFormItem[];

export type ApplicationState = {
  error: string | null;
  items: { [key: string]: any };
  selectedItemKey: string | null;
};

export type ApplicationForm = {
  items: ApplicationFormItems;
} & {
  selectedKey: string | null;
  selectedItem?: StaticItemModel<FormItemConfig>;
  unselect: Callback;
  state: ApplicationState;
};

export type ApplicationFormParams = {
  items: ApplicationFormItem[];
  dataLink: ObjectLink<Data<any>>;
  stateLink: ObjectLink<ApplicationState>;
  modals: Modals,
  onFormSubmitted: () => void,
  continueLink: SingleLink<boolean>,
};

const useApplicationFormModel = (
  config: Collection<any>,
  dataLink: ObjectLink<any>,
  saveAction: null | Function,
  onFormSubmitted,
): ApplicationForm | null => {
  const continueLink = useSingleLink(false);
  const [staticData] = useState<StaticItemModel<FormItemConfig>[]>(
    initStaticModel<FormItemConfig>(config)
  );
  const modals = useContext(ModalsContext);
  const stateLink = useObjectLink<ApplicationState>({
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
