import { createSelector } from "reselect";
import items from "./items";
import save from "../actions/save";

const submitted: any = createSelector(
  save,
  items,
  (saveAction, items) =>
  {
      return (
        saveAction &&
        items.every(
          v => !v.required || (v.defaultValue && !v.validationError)
        )
      );

  });

export default submitted;
