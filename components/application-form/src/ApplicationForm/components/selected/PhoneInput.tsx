import upgrade from "../../../../utils/upgrade";
import SelectedString from "./SelectedString";

const SelectedPhoneInput = upgrade(SelectedString, {
  autoFocus: true,
  type: "string",
  returnKeyType: "next",
  dataDetectorType: "phoneNumber",
  keyboardType: "phone-pad"
});

export default SelectedPhoneInput;
