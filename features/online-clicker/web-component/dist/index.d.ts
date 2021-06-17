/// <reference types="react" />
interface OnlineClicker {
    click: () => void;
    total: number;
    couldClick: boolean;
    totalUsers: number;
}
declare const OnlineClicker: ({ click, total, totalUsers, couldClick }: OnlineClicker) => JSX.Element;
export default OnlineClicker;
