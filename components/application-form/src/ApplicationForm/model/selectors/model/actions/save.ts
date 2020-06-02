import { createSelector } from "reselect";
import items from "../props/items";
import unselect from "./unselect";

const save: any = createSelector(
  ({ saveAction }) => saveAction,
  ({ dataLink }) => dataLink.value,
  unselect,
  (save, data, unselect) =>
    save
      ? () => {
          save(data);
          unselect();
          // resetData();
        }
      : null
);

export default save;
