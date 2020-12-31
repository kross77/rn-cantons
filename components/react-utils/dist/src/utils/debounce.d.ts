declare function debounce<T extends Function>(cb: T, wait?: number): (...args: any) => void;
export default debounce;
