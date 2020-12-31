import itemSelector from "../../item";

const items: any = (p) => {
    return p?.items.map((item: any) => {
        return itemSelector(p, item);
    }) || [];
};

export default items;
