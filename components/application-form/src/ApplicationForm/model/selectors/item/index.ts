import { createStructuredSelector, createSelector } from "reselect";
import defaultValue from "./props/itemValue";
import selected from "./props/itemSelected";
import state from "./props/itemState";
import update from "./actions/update";
import select from "./actions/select";
import setState from "./actions/setState";
import validate from "./actions/validate";
import updateModel from "../model/actions/update";
import next from "./actions/next";
import validationError from "./props/validationError";
import enablesReturnKeyAutomatically from "./props/enablesReturnKeyAutomatically";

const itemExtraProps = createStructuredSelector({
  //props
  defaultValue,
  selected,
  validationError,
  enablesReturnKeyAutomatically,
  state,

  //actions
  update,
  next,
  select,
  validate,
  updateModel,
  setState,
});

const itemSelector = createSelector(
  (p, i) => i,
  itemExtraProps,
  (item, extraProps) => ({ ...item, ...extraProps })
);

export default itemSelector;
