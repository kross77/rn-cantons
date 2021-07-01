/// <reference types="react" />
import Form from "../Form";
import Layout from "@rn-cantons/layout";
interface ApplicationForm {
    name: "search" | "register" | "transport" | "transports" | "authorization" | "tenderReply";
    isSubmit?: boolean;
    isWarnings?: boolean;
    requiredFieldsFilledConfirmation?: boolean;
    form?: Form;
    layoutItems?: Layout;
    formId: string;
    onFormSubmitted?: () => void;
}
declare const ApplicationForm: ({ requiredFieldsFilledConfirmation, wrapper: Wrapper, dataLink: dataLinkProp, children, onSave, isSubmit, form, isWarnings, name, defaultValue, layoutItems, onClose, onFormSubmitted, submit, isTags }: ApplicationForm) => JSX.Element;
export default ApplicationForm;
