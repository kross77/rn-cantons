import React from "react";

const renderList = (items: any[], Component: React.ComponentType, Loading: React.ComponentType, keyExractor: (item: any, index: number) => string = ({id}) => id): JSX.Element[] | JSX.Element => {
    if(!items){
        return <Loading/>
    }
    return items.map((item: any, index: number) => <Component key={keyExractor(item, index)}{...item}/>)
};


export default renderList;
