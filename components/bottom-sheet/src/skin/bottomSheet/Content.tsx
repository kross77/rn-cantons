import {TouchableOpacity} from "react-native";
import Layout from "@kross77/react-native-layout";
import React from "react";

interface Content {
    isOpen: boolean
    openPopup: () => void
    height: number
    children: JSX.Element | JSX.Element[]
}

const Content = ({isOpen, openPopup, height, children}: Content) => (
    <TouchableOpacity disabled={isOpen} onPress={openPopup} activeOpacity={1}>
        <Layout
            w h={height} ac white
            style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}
        >
            {/*
            //@ts-ignore*/}
            <Layout color={'#032237'} h={5} r={2.5} w={80} mv={8} />
            {/*
            //@ts-ignore*/}
            {children}
        </Layout>
    </TouchableOpacity>
)

export default Content;
