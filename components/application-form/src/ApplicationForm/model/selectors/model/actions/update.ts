import { ApplicationFormParams } from "../../../index";
const update = (p: ApplicationFormParams) => (key: string, value: any) =>
  p.dataLink?.update({ [key]: value });
export default update;
