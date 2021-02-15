import React from "react";
import Layout from "@rn-cantons/layout";

interface Wrapper {
    isOpen: boolean
    fade: JSX.Element
    bottomSheet: JSX.Element
}

const Wrapper = ({
                     fade,
                     bottomSheet,
                 }: Wrapper) => (
    <>
        {fade}
        {/*
        //@ts-ignore */}
        <Layout absolute zIndex={1} wh ph={20} ac pointerEvents={'box-none'}>
            {bottomSheet}
        </Layout>
    </>
)

export default Wrapper;
