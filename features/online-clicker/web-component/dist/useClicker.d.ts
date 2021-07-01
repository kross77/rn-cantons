import 'firebase/firestore';
import React from 'react';
interface Clicker {
    clicksPropertyName?: string;
    clickTableName: string;
    settingsTableName: string;
}
interface ReactOnlyProps {
    condition: boolean;
    children: React.ReactChildren;
    preloader: React.ReactElement | null;
}
export declare const RenderOnly: ({ condition, children, preloader, }: ReactOnlyProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactChildren | null;
declare const useClicker: (params: Clicker) => {
    total: number;
    couldClick: any;
    click: () => void;
};
export default useClicker;
