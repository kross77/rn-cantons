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
            w h={height} ac color={'grey'}
            style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}
        >
            <Layout color={'blue'} h={5} r={2.5} w={80} mv={8} />
            {/*
            //@ts-ignore*/}
            {children}
        </Layout>
    </TouchableOpacity>
)

export default Content;
