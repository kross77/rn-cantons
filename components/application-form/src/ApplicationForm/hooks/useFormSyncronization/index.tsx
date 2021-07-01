import * as React from "react";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useObjectLink } from "../../../../utils/linkUtils";

export const useFormSyncronization = (formId: string, formName: string, defaultValue: any = null) => {
  const data = useObjectLink<any>(defaultValue);
  const onStartLoad = () => {
    data.set(defaultValue);
  };

  const onLoaded = (s: any) => {
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
      } catch (e) {}
    }
  }, [formId, formName]);

  const update = async updatedData => {
    data.update(updatedData);
    try {
      await firestore()
        .collection("forms")
        .doc(formId)
        .set({ [formName]: updatedData }, { merge: true });
    } catch (e) {
      throw e;
    }
  };
  return {
    ...data,
    update,
    set: update
  };
};
export const useFormArraySyncronization = (
  formId: string,
  formName: string,
  name: string
) => {
  const data = useObjectLink<any>(null);
  const formData = useObjectLink<any>(null);
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
      } catch (e) {}
    }
  }, [formId, formName]);

  const update = async updatedData => {
    data.update(updatedData);
    try {
      await firestore()
        .collection("forms")
        .doc(formId)
        .set({ [formName]: { [name]: updatedData } }, { merge: true });
    } catch (e) {
      throw e;
    }
  };
  return {
    ...data,
    update,
    set: update
  };
};
