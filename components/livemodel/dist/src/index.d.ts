import React from "react";
declare const createLiveModel: <T extends any>(selector: any) => {
    Context: React.Context<T | null>;
    Provider: ({ children }: {
        children: any;
    }) => JSX.Element;
    Consumer: React.Consumer<T | null>;
};
export default createLiveModel;
