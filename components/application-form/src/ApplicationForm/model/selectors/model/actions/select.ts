import { ApplicationFormParams } from "../../../index";
const select = (p: ApplicationFormParams) => (key: string | null) =>
{
    p.stateLink.update({ selectedItemKey: key });
}
export default select;
