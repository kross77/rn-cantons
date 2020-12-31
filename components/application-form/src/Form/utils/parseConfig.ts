import { Collection } from "../../../../utils/commonTypes";

export type StaticItemModel<T> = T & {
  type: string;
  elementType: string;
  key: string;
  formKey: string;
};

const parseConfig = <T extends any>(
  config: Collection<T>
): StaticItemModel<T>[] => {
  return config.map((v, i) => {
    const formKey = Object.keys(v)[0];
    const { component: type, type: elementType, ...item } = Object.values(
      v
    )[0] as any;
    return {
      type,
      elementType,
      key: `[formItems_${formKey}_${i}]`,
      formKey,
      ...item
    };
  });
};

export default parseConfig;
