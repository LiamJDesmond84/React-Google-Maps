import React from 'react'
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox"

const Search = () => {

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions } = usePlacesAutoComplete({requestOptions: {
        // "ready" - are the libraries ready (useLoadScript)
        // "value" - current value the user is typing the the search box - use in COMBOBOXINPUT
        // "suggestions" - search results from Google API - with their "status" & "data"
        location: {lat: () => 32.715736, lng: () => -117.161087},  // Preferred lotacion
        radius: 200 * 1000 // kilometers to meters conversion
    }})
    return (
        <div className="search-bar">
            <Combobox onSelect={(address) => {console.log(address)}}>
                <ComboboxInput value={value} onChange={(e) => {setValue(e.target.value)}} placeholder="Enter an address" disable={!ready}  /> {/*Search Input*/}
                <ComboboxPopover> {/*Search results*/}
                    {status === "OK" &&
                    data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                    ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default Search
