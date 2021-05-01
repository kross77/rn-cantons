import 'firebase/firestore';
interface Clicker {
    clicksPropertyName: string;
    clickTableName: string;
    settingsTableName: string;
}
declare const useClicker: (params: Clicker) => {
    total: number;
    couldClick: any;
    click: () => void;
};
export default useClicker;
