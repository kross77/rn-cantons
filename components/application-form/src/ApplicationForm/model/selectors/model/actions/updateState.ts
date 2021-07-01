import { ApplicationFormParams } from "../../../index";

const updateState = (p: ApplicationFormParams) => (key: string, value: any) => p.stateLink.update({ [key]: value });
export default updateState;
