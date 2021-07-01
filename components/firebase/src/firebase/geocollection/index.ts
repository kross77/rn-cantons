import * as geofirex from 'geofirex';

const createGeoCollection = (collectionName: string, firebase: any) => {
    const geo = geofirex.init(firebase);
    const ref = firebase.firestore().collection(collectionName);
    return {
        ...ref,
        add: ({latitude, longitude, ...props}: any) => {
            const position = geo.point(latitude, longitude);
            ref.add({...props, position});
        },
        updatePoint: ({id, latitude, longitude}: any) => {
            const position = geo.point(latitude, longitude);
            ref.doc(id).set({position}, {merge: true})
        },
        createGeoSubscription: (
            {center, radius, onUpdate}: any
        ) => {
            return geo.query(ref).within(center, radius, 'position').subscribe(onUpdate)
        }
    }
}

export default createGeoCollection;
