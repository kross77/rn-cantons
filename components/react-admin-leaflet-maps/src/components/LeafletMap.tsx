//@ts-ignore
import { LatLng } from "leaflet";
import * as React from "react";
//@ts-ignore
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Search from "react-leaflet-search";
import {useObjectLink} from "@rn-cantons/react-link";


interface LeafletMapState{
    count: number
    search: LatLng
    bounds: {lat: number, lng: number}[]
    maxZoom: number
    maxBounds: [[number, number], [number, number]]
}

interface LeafletProviderOptions{
    searchBounds: [LatLng, LatLng]
    region: string
}

interface LeafletMap extends LeafletMapState{
    providerOptions: LeafletProviderOptions
    styles: any
}


const defaultStyles = {
    position: "relative",
    width: "100%",
    height: "400px",
    background: "grey",
    overflow: "hidden",
    outline: "none",
}

const SearchInfoPopup = (p: any) => {
    return (
        <Popup>
            <div>
                <p>I am a custom popUp</p>
                <p>
                    latitude and longitude from search component:{" "}
                    {p.latLng.toString().replace(",", " , ")}
                </p>
                <p>Info from search component: {p.info}</p>
                <p>
                    {p.raw &&
                    p.raw.place_id &&
                    JSON.stringify(p.raw.place_id)}
                </p>
            </div>
        </Popup>
    )
}

const LeafletMap = (p:LeafletMap) => {
    const stateLink = useObjectLink<LeafletMapState>(p)
    return (
        <Map
            className="leaflet-map-input"
            style={{...defaultStyles, ...p.styles}}
            scrollWheelZoom={true}
            bounds={stateLink.value?.bounds}
            maxZoom={stateLink.value?.maxZoom}
            maxBounds={stateLink.value?.maxBounds}
        >
            <TileLayer
                noWrap={true}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/**
             //@ts-ignore **/}
            <Search
                // customProvider={this.provider}
                //   onChange={(info) => {
                //     console.log("FROM onChange: ", info);
                //   }}
                position="topleft"
                inputPlaceholder="Custom placeholder"
                // search={this.state.search}
                showMarker={false}
                zoom={17}
                closeResultsOnClick={true}
                openSearchOnLoad={false}
                // these searchbounds would limit results to only Turkey.
                providerOptions={{
                    searchBounds: [new LatLng(-90, -180), new LatLng(90, 180)],
                    region: "by"
                }}

                // default provider OpenStreetMap
                // provider="BingMap"
                // providerKey="AhkdlcKxeOnNCJ1wRIPmrOXLxtEHDvuWUZhiT4GYfWgfxLthOYXs5lUMqWjQmc27"
            >
                {(info: any) => (
                    <Marker position={info?.latLng}>
                        <SearchInfoPopup {...info} />
                    </Marker>
                )}
            </Search>
        </Map>
    )
}

LeafletMap.defaultProps = {
    styles: {},
    providerOptions: {
        searchBounds: [new LatLng(-90, -180), new LatLng(90, 180)],
        region: "by"
    },
    count: 0,
    search: new LatLng(41.009633, 28.965165),
    maxZoom: 17,
    maxBounds: [
        [-90, -180],
        [90, 180]
    ],
    bounds: [
        {
            lat: 33.100745405144245,
            lng: 24.510498046875
        },
        {
            lat: 33.100745405144245,
            lng: 46.48315429687501
        },
        {
            lat: 44.55916341529184,
            lng: 46.48315429687501
        },
        {
            lat: 44.55916341529184,
            lng: 24.510498046875
        }
    ]
}


export default LeafletMap;
