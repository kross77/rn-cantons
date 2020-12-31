import Map from "../../../../../Map";
import shouldUpdate from "../../../../../../utils/shouldUpdate";
export const PersistMap = shouldUpdate((p, n) => JSON.stringify(p.origin) !== JSON.stringify(n.origin))(Map);
export default PersistMap;
//# sourceMappingURL=PersistMap.js.map