import React, { useState, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { formatRelative } from 'date-fns'
import "@reach/combobox/styles.css"
import Search from './Search'

const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const center = { // San Diego lat & lng
    lat: 32.715736,
    lng: -117.161087
}
// const options = { // https://snazzymaps.com/
//     styles: 
// }

// const libraries = ["places"]

export const GoogleMaps = () => {
    const [ libraries ] = useState(['places']);
    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null);

    const onMapClick = React.useCallback((e) => setMarkers(currentState => [...currentState, { // Adding new markers on click
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
    }]), []);

    // React.useRef();
    const mapRef = useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])


    const { isLoaded, loadError } = useLoadScript ({ // Loading additional libraries & adding API_KEY
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    return (
        <div>
            <h1>Booyah!!</h1>
            <Search />
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center} onClick={onMapClick} onLoad={onMapLoad} >
                {markers.map(x => <Marker key={x.time.toISOString()} position={{ lat: x.lat, lng: x.lng }} onClick={() => setSelected(x)} />)}

            { selected ? (
            <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => setSelected(null)}>
                {/* onCloseClick={() => setSelected(null) - After closing info window, can re-open another*/}
                <div>
                    <h2>Whateva</h2>
                    <p>Stuff happened at {formatRelative(selected.time, new Date())}</p> {/* current relative time */}
                    <p>Location {selected.lat}</p>
                </div>
            </InfoWindow>) 
            : null }
            </GoogleMap>
        </div>
    )
}
//https://www.youtube.com/watch?v=WZcxJGmLbSo