var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as geofirex from 'geofirex';
const createGeoCollection = (collectionName, firebase) => {
    const geo = geofirex.init(firebase);
    const ref = firebase.firestore().collection(collectionName);
    return Object.assign(Object.assign({}, ref), { add: (_a) => {
            var { latitude, longitude } = _a, props = __rest(_a, ["latitude", "longitude"]);
            const position = geo.point(latitude, longitude);
            ref.add(Object.assign(Object.assign({}, props), { position }));
        }, updatePoint: ({ id, latitude, longitude }) => {
            const position = geo.point(latitude, longitude);
            ref.doc(id).set({ position }, { merge: true });
        }, createGeoSubscription: ({ center, radius, onUpdate }) => {
            return geo.query(ref).within(center, radius, 'position').subscribe(onUpdate);
        } });
};
export default createGeoCollection;
//# sourceMappingURL=index.js.map