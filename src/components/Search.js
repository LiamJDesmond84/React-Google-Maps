import React from 'react'
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox"



const Search = (props) => {
    const { panTo } = props;


    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutoComplete({requestOptions: {
        // "ready" - are the libraries ready (useLoadScript)
        // "value" - current value the user is typing the the search box - use in COMBOBOXINPUT
        // "suggestions" - search results from Google API - with their "status" & "data"
        location: {lat: () => 32.715736, lng: () => -117.161087},  // Preferred lotacion
        radius: 200 * 1000 // kilometers to meters conversion
    }})
    return (
        <div className="search-bar">
            <Combobox onSelect={async (address) => {
                setValue(address, false); {/* sets value to what the user selected, "shouldFetchData: false" we already know the value the user selected */}
                clearSuggestions();

                try { {/* Geocoding address, converting the results to lat/long, passes lat/long to panTo function */}
                    const results = await getGeocode({ address} );
                    const {lat, lng} = await getLatLng(results[0])
                    panTo({ lat, lng }); {/* call panTo function in GoogleMaps.js */}
                }
                catch(err) {
                console.log(err);
                }
            }}>
                <ComboboxInput value={value} onChange={(e) => {setValue(e.target.value)}} placeholder="Enter an address" disabled={!ready}  /> {/*Search Input*/}
                <ComboboxPopover> {/*Search results*/}
                    <ComboboxList>

                        { status === "OK" &&
                        data.map(({ description }) => (
                        <ComboboxOption key={description} value={description} />
                        ))}

                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default Search
