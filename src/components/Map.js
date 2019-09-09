import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker,  } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
// Geocode.enableDebug();  // For Development Purpose

/**
 * class Map
 * Features implemented
 * 1. Display All Default Markers from Find endpoint using Google drawing,places
 * 2. update current Marker center to searched location using google Api
 * 3. Autocomplete Search using Google Autocomplete API
 */
class Map extends Component{

    /**
     *
     * @type {{mapPosition: {lat: (*|number), lng: *}, markerPosition: {lat: (*|number), lng: *}}}
     */
    state = {
        mapPosition: {
            lat: this.props.center.lat,
            lng: this.props.center.lng
        },
        markerPosition: {
            lat: this.props.center.lat,
            lng: this.props.center.lng
        }
    }

    /**
     * Component should only update ( meaning re-render ), when the user selects the location
     *
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate( nextProps, nextState ){
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.markerPosition.lat !== nextState.markerPosition.lat
        ) {
            return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
            return false
        }
    }
    /**
     * This Event triggers when the marker window is closed
     *
     * @param event
     */
    onInfoWindowClose = ( event ) => {

    };

    /**
     * When the user types an address in the search box
     * @param place
     *
     */
    onPlaceSelected = ( place ) => {
        if(!place.place_id){
            alert("Place Did not match to any Valid Location Please Close the window and Try again.")
        }else {
            const latValue = place.geometry.location.lat(),
                lngValue = place.geometry.location.lng();
            // Set these values in the state.
            this.setState({
                markerPosition: {
                    lat: latValue,
                    lng: lngValue
                },
                mapPosition: {
                    lat: latValue,
                    lng: lngValue
                },
            })
        }
    };

    render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={ this.props.google }
                               defaultZoom={ this.props.zoom }
                               defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                paddingLeft: '16px',
                                marginTop: '2px',
                                width: '48rem'
                            }}
                            onPlaceSelected={ this.onPlaceSelected }
                            types={['(regions)']}
                        />

                        {/*Marker*/}
                        <Marker google={this.props.google} key={this.state.markerPosition.lat}
                                position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        >
                            {/* InfoWindow on top of marker */}
                            <InfoWindow
                                onClose={this.onInfoWindowClose}
                                position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
                            >
                                <div>
                                    <h4 style={{ padding: 0, margin: 0 }}> Lattitude : { this.state.markerPosition.lat } </h4>
                                    <br/>
                                    <h4 style={{ padding: 0, margin: 0 }}> Longitude : { this.state.markerPosition.lng } </h4>
                                    Selected Location Marker
                                </div>
                            </InfoWindow>
                        </Marker>
                        {/*All Properties Markers*/}
                        <Marker/>
                        {props.markers.length && props.markers.map(marker=> {
                                return <Marker google={this.props.google} key={marker.propertyId}
                                        position={{lat: marker.coordinates[0], lng: marker.coordinates[1]}}
                                               onClick={(e)=>console.log({lat: marker.coordinates[0], lng: marker.coordinates[1]})}
                                >
                                    {(this.state.openInfoWindowMarkerId === marker.propertyId)?
                                        <InfoWindow
                                            position={{lat: (marker.coordinates[0] + 0.0018), lng: marker.coordinates[1]}}
                                        >
                                            <div>
                                                <h4 style={{padding: 0, margin: 0}}> Lattitude : {marker.coordinates[0]} </h4>
                                                <br/>
                                                <h4 style={{padding: 0, margin: 0}}> Longitude : {marker.coordinates[1]} </h4>
                                                Marker # {marker.propertyId}
                                            </div>
                                        </InfoWindow>:<div></div>
                                    }
                                </Marker>
                            }
                        )}
                        <Marker/>
                    </GoogleMap>
                )
            )
        );
        // Using Map wrapper
        let map;
        if( this.props.center.lat !== undefined ) {
            map = <div className="map-container">
                <AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places,drawing`}
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%`, width:`50%` }} />
                    }
                    markers={this.props.properties}
                />
            </div>
        } else {
            map = <div style={{height: this.props.height}} />
        }
        // returning Final map here.
        return( map )
    }
}
export default Map
