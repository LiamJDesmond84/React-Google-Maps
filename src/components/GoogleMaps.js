import React, { useState, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { formatRelative } from 'date-fns'
import "@reach/combobox/styles.css"
import Search from './Search'
import Locate from './Locate'

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

    const mapRef = useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = React.useCallback(({lat, lng}) => { // Pans to selected location from search and zooms in
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, [])


    const { isLoaded, loadError } = useLoadScript ({ // Loading additional libraries & adding API_KEY
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    return (
        <div>
            <h1>Map (in progress)</h1>
            <Search panTo={panTo} />
            <Locate panTo={panTo}  />
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center} onClick={onMapClick} onLoad={onMapLoad} >
                {markers.map(x => <Marker key={x.time.toISOString()} position={{ lat: x.lat, lng: x.lng }} onClick={() => setSelected(x)} />)}

            { selected ? (
            <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => setSelected(null)}>
                {/* onCloseClick={() => setSelected(null) - After closing info window, can re-open another*/}
                <div>
                    <h2>New Location</h2>
                    <p>Time clicked: {formatRelative(selected.time, new Date())}</p> {/* current relative time */}
                    <p>Latitude: {selected.lat}, Longitude: {selected.lng}</p>
                </div>
            </InfoWindow>) 
            : null }
            </GoogleMap>
        </div>
    )
}
//https://www.youtube.com/watch?v=WZcxJGmLbSo