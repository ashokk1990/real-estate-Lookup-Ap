import React from "react";
import PropertySearchForm from "./PropertySearchForm";
import {GridBox, GridContainer} from "./StyledComponent";
import Api from "../config/Api"
import {Link,withRouter} from "react-router-dom";

/**
 * Property Search Component
 * functional component
 * @param props
 * @returns {*}
 * @constructor
 */
const PropertySearch = (props) => {
    return (
        <div className="property-search">
            <PropertySearchForm onSubmit={props.handleSubmit}/>
            {props.properties.length > 0 && <h1> List of Properties </h1>}
            {
                (props.properties.length) ?
                        <GridContainer>
                            {
                                props.properties.map(property => {
                                    return (
                                    <GridBox key={property.propertyId}>
                                            <img alt="ZestyAi"
                                                 src={`${Api.BASE_URL}/display/${property.propertyId}?overlay=${Api.OVERLAY}&building=${Api.BUILDING}&parcel=${Api.PARCEL}`}
                                                 width="100%" height="100%"/>
                                            <h5>Coordinates: {`${property.coordinates[0]}, ${property.coordinates[1]}`}</h5>
                                            <Link to={{ pathname:`/property/${property.propertyId}`, state:{property}}}>Details</Link>
                                        </GridBox>
                                    )
                                })
                            }
                        </GridContainer>
                    : !props.initialLoad &&  <h4> No Properties Available at this Location. Please update coordinates or increase radius</h4>
            }
        </div>

    )
}
export default withRouter(PropertySearch)
