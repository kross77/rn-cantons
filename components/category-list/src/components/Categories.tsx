import React from 'react'
import renderList from "../utils/rendersList";
import Layout from "@kross77/react-native-layout";

interface Categories extends Layout{
    Label: React.ComponentType
    Loading: React.ComponentType
    items: any[]
}

const Categories: React.ComponentType<Categories> = ({
                                                         Label,
                                                         Loading,
                                                         items,
                                                     ...props}:Categories) => {

    return <Layout row gap={10} {...props}>
        {renderList(items, Label, Loading)}
        </Layout>
}

export default Categories;
