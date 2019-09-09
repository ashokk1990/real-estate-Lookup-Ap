import React from 'react'
import Api from "../config/Api";

/**
 * PropertyDetails Component for each property.
 * @param props
 * @returns {*}
 * @constructor
 * Todo: Improve look and feel for this component(ran out of time) and move api call to Api.js
 */

class PropertyDetails extends React.PureComponent {
    state = {
        stats: ''
    }
    loadStats = async (id) => {
        try {
            const response = await fetch(`${Api.BASE_URL}/statistics/${id}?distance=1755000`, {
                method: 'get'
            })
            response.json().then(stats => this.setState({stats: stats}))
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount(){
        this.loadStats(this.props.location.state.property.propertyId)
    }
    render() {
        const {property} = this.props.location.state;
        return (
            <div className="container">
                <h1>Welcome to the Property Details</h1>
                <div key={property.propertyId} className="details-container">
                    <img alt="ZestyAi"
                         src={`${Api.BASE_URL}/display/${property.propertyId}?overlay=${Api.OVERLAY}&building=${Api.BUILDING}&parcel=${Api.PARCEL}`}
                         width="100%" height="100%"/>
                    <h5>Coordinates : {`${property.coordinates[0]}, ${property.coordinates[1]}`}</h5>
                    <div>Areas : {JSON.stringify(this.state.stats.buildingAreas)}</div>
                    <p>Distances : {JSON.stringify(this.state.stats.buldingDistances)}</p>
                    <p>Parcel Area : {this.state.stats.parcelArea}</p>
                    <p>Zone Density : {this.state.stats.zone_density}</p>
                </div>
            </div>
        );
    }
}

export default PropertyDetails;
