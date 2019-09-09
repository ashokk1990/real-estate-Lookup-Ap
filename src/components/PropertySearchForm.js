import React, {useState} from "react";

/**
 * Property Search Form Component
 * Used React Hooks method Experimental feature offered latest in React just to demonstrate use of Hooks.
 * @param props
 * @returns {*}
 * @constructor
 */
const PropertySearchForm = (props) => {
    const [locationData, setLocationData] = useState({
        Latitude: "",
        Longitude: "",
        xRadius: 10000
    });

    const updateFormData = event =>
        setLocationData({
            ...locationData,
            [event.target.name]: event.target.value
        });

    const { Latitude, Longitude, xRadius } = locationData;

    return (
        <form onSubmit={(e)=>props.onSubmit(e,locationData)}>
            <input
                value={Latitude}
                onChange={e => updateFormData(e)}
                placeholder="Latitude"
                type="text"
                name="Latitude"
                required
            />
            <input
                value={Longitude}
                onChange={e => updateFormData(e)}
                placeholder="Longitude"
                type="text"
                name="Longitude"
                required
            />
            <input
                value={xRadius}
                onChange={e => updateFormData(e)}
                placeholder="x-Radius"
                name="xRadius"
                required
            />
            <button type="submit">Search Property</button>
        </form>
    );
};

export default PropertySearchForm;
