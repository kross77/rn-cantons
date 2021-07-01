import { createSelector } from "reselect";
import items from "./items";
import save from "../actions/save";

const errors: any = createSelector(
  items,
  items => {
    return items.map(
      v =>
        (v.required && !v.defaultValue && `Поле ${v.label} не заполненно`) ||
        v.validationError
    );
  }
);

export default errors;
