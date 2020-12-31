import React from 'react';
interface IComponents {
    [key: string]: React.ComponentType<any>;
}
export declare const createTypeComponent: (components: IComponents, typeProp?: string, forward?: boolean) => (({ [typeProp]: type, ...props }: any, ref: any) => JSX.Element) | React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;
export default createTypeComponent;
