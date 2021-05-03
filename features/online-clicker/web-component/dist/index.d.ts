/// <reference types="react" />
interface OnlineClicker {
    click: () => void;
    total: number;
    totalUsers: number;
}
declare const OnlineClicker: ({ click, total, totalUsers }: OnlineClicker) => JSX.Element;
export default OnlineClicker;
