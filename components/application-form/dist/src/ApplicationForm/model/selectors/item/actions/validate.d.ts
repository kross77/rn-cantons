import { ApplicationFormParams } from "../../../index";
declare const validate: import("reselect").OutputParametricSelector<ApplicationFormParams, any, (value: any) => Promise<{
    error: any;
}>, (res1: (key: string, value: any) => any, res2: any) => (value: any) => Promise<{
    error: any;
}>>;
export default validate;
