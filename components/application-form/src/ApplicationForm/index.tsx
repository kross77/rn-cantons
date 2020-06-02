import * as configs from "./configs";
import components from "./components";
import Form from "../Form";
import * as React from "react";
import {useContext, useEffect} from "react";
import Layout from "@rn-cantons/layout";
import useApplicationFormModel from "./model";
import PopupContent from "./components/Popup";
import Skin from './skin'
import Block from "@kross77/rn-block/dist";
import {ModalsContext} from "../Animation/components/Modals";
import {useFormSyncronization} from "./hooks/useFormSyncronization";

interface ApplicationForm {
    name: "search" | "register" | "transport" | "transports" | "authorization" | "tenderReply";
    isSubmit?: boolean;
    isWarnings?: boolean;
    requiredFieldsFilledConfirmation?: boolean;
    form?: Form;
    layoutItems?: Layout,
    formId: string,
    onFormSubmitted?: () => void
}

const ApplicationForm = ({
                             requiredFieldsFilledConfirmation,
                             wrapper: Wrapper = React.Fragment,
                             dataLink: dataLinkProp,
                             children,
                             onSave,
                             isSubmit,
                             form,
                             isWarnings,
                             name,
                             defaultValue,
                             layoutItems = {},
                             onClose,
                             onFormSubmitted,
                             submit,
                             isTags
                         }: ApplicationForm) => {
    const saveAction = onSave;
    const dataLink = dataLinkProp || useFormSyncronization(formId, name, defaultValue);
    const model = useApplicationFormModel(configs[name], dataLink, saveAction, onFormSubmitted);

    const modals = useContext(ModalsContext);

    useEffect(() => {
        const isOpen = !!(model && model?.selectedKey);
        if (isOpen) {
            modals.pop();
            modals.add(<PopupContent
                model={model}
                isTags={isTags}
                requiredFieldsFilledConfirmation={requiredFieldsFilledConfirmation}
            />, model?.unselect)
        } else {
            modals.pop()
        }
    }, [model?.selectedKey])

    const {Button, Text} = Skin;


    return (
        <>
            <Wrapper>
                <Layout pv={20} ph={20} {...layoutItems}>
                    <Form items={model?.items} components={components} {...form}/>
                    {children}
                    <Layout pv={25}>
                        {isSubmit &&
                        (
                            <Button
                                icon={'save'}
                                disabled={!model.submitted}
                                chevron={false} children={'Coхранить'}
                                {...submit}
                                onPress={() => {
                                    model.save();
                                    onClose();
                                }}
                            />
                        )

                        }
                        <Block height={30}/>
                        {
                            isWarnings && <Layout gap={10}>{
                                model.errors.map(err => <Text key={err}>{err}</Text>)
                            }</Layout>
                        }
                    </Layout>
                </Layout>
            </Wrapper>
        </>

    );
};

export default ApplicationForm;
