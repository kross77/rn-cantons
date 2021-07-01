interface ModalsProps {
    items: any[];
}
interface ModalsActions {
}
export declare type Modals = ModalsProps & ModalsActions;
export interface ModalStore {
    items: any[];
}
declare const useModalLogic: () => Modals;
export default useModalLogic;
