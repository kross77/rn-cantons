var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useObjectLink } from "../../../../utils/linkUtils";
export const useFormSyncronization = (formId, formName, defaultValue = null) => {
    const data = useObjectLink(defaultValue);
    const onStartLoad = () => {
        data.set(defaultValue);
    };
    const onLoaded = (s) => {
        const val = s.data();
        if (val) {
            const valElement = val[formName] || {};
            data.set(valElement);
        }
    };
    useEffect(() => {
        if (formId && formName) {
            onStartLoad();
            data.set({ loading: true });
            try {
                firestore()
                    .doc(`forms/${formId}`)
                    .get()
                    .then(val => onLoaded(val));
            }
            catch (e) { }
        }
    }, [formId, formName]);
    const update = (updatedData) => __awaiter(void 0, void 0, void 0, function* () {
        data.update(updatedData);
        try {
            yield firestore()
                .collection("forms")
                .doc(formId)
                .set({ [formName]: updatedData }, { merge: true });
        }
        catch (e) {
            throw e;
        }
    });
    return Object.assign(Object.assign({}, data), { update, set: update });
};
export const useFormArraySyncronization = (formId, formName, name) => {
    const data = useObjectLink(null);
    const formData = useObjectLink(null);
    const onStartLoad = () => {
        data.set(null);
    };
    const onLoaded = s => {
        const val = s.data();
        if (val) {
            const valElement = val[formName][name] || {};
            const valForm = val[formName][name] || {};
            data.set(valElement);
            formData.set(valForm);
        }
    };
    useEffect(() => {
        if (formId && formName) {
            onStartLoad();
            data.set({ loading: true });
            try {
                firestore()
                    .doc(`forms/${formId}`)
                    .get()
                    .then(val => onLoaded(val));
            }
            catch (e) { }
        }
    }, [formId, formName]);
    const update = (updatedData) => __awaiter(void 0, void 0, void 0, function* () {
        data.update(updatedData);
        try {
            yield firestore()
                .collection("forms")
                .doc(formId)
                .set({ [formName]: { [name]: updatedData } }, { merge: true });
        }
        catch (e) {
            throw e;
        }
    });
    return Object.assign(Object.assign({}, data), { update, set: update });
};
//# sourceMappingURL=index.js.map