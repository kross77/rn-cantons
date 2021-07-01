import { useParseFormItems } from "./index";
import initStaticModel from "./utils/parseConfig";
import formComponents from "../../ApplicationForm/components";
import { renderHook } from "@testing-library/react-hooks";
import logfn from "../../../utils/logfn";
const model = [
    {
        fullName: {
            component: "string",
            label: "ФИО",
            multiline: false,
            placeholder: "Введите ваше ФИО",
            description: "Ваше ФИО будут видеть клиенты или водители",
            required: true,
            icon: "user"
        }
    },
    {
        test: {
            component: "string",
            label: "ФИО",
            multiline: false,
            placeholder: "Введите ваше ФИО",
            description: "Ваше ФИО будут видеть клиенты или водители",
            icon: "user"
        }
    }
];
it("App parses form parameters", () => {
    const items = renderHook(() => useParseFormItems({
        model: model,
        components: formComponents,
        onFormUpdate: () => null,
        values: {}
    }));
    const result = items.result.current;
    expect(result[0]).toBeDefined();
    expect(result[1]).toBeDefined();
});
it("Create Form works correctly", () => {
    const form = initStaticModel(model, formComponents, {}, logfn('on form update'));
    expect(form).toBeDefined();
});
//# sourceMappingURL=index.test.js.map