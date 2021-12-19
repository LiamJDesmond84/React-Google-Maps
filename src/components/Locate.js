import React from 'react'


const Locate = (props) => {
    const { panTo } = props;

    return (
        <button className="locate" onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }, () => null);
        }}><img src={require("./img/karlP.png")} alt="compass" />
            
        </button>
    )
}

export default Locate
