import * as React from 'react';
import { addField } from 'ra-core';
import {useObjectLink} from "@rn-cantons/react-link";
import { useEffect } from 'react';
import Map from './components/LeafletMap';

export const getMarkers = (input: any) => input.value || null;

export const getPosition = (e: any) => ({
    lng: e.latLng.lng(),
    lat: e.latLng.lat(),
});

interface GMap{
    defaultZoom: number
    defaultCenter: any
    googleKey: any
    input: any
    multipleMarkers: any
    searchable: any
    justShow: any
}

interface GMapState{
    center: any
    zoom: number
}

class LeafletMapUtils{
    static putMarker(){

    }

    static putMarkerFromSearch(){

    }

    static deleteMarker(){

    }

    static setCenter(){

    }
}

const LeafletMap = ({
                  defaultCenter,
                        input,
              }: GMap) => {
    const stateLink = useObjectLink<GMapState>({
        center: defaultCenter,
    })



    useEffect(() => {
        const markers = getMarkers(input);
        if (markers) {
            if (markers instanceof Array) {
                stateLink.update({ center: markers[markers.length - 1] });
            } else {
                stateLink.update({ center: markers });
            }
        }
    }, [])


    useEffect(() => {
        console.log('LeafletMap update state', stateLink.value)
    }, [stateLink.value])

    return (
            <Map />
    )
}


export const LeafletMapInput = addField(LeafletMap);
export const LeafletMapField = ({ record, source, ...props }: any) => (
    <LeafletMap
        {...props}
        justShow
        input={{ value: record[source] }}
        searchable={false}
/>)