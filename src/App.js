import React from "react";
import "./index.css";
import Map from './components/Map'
import PropertySearch from "./components/PropertySearch";
import PropertyDetails from "./components/PropertyDetails";
import {Route, Switch} from "react-router-dom";
import {findProperties} from "./config/Api";

class PropertyApp extends React.PureComponent {

    /**
     * State Object
     * @type {{searchType: string, isSelected: boolean, center: {lat: number, long: number, distance: number}, propertyMap: {}, properties: Array}}
     */

    state = {
        searchType: '',
        isSelected: false,
        properties: [], //this is for map markers
        searchProperties: [], // this is for search list
        initialLoad: true
    }

    /**
     * Fetch Properties from server and store them in state.
     * When the user types an address in the search box or need markers for map.
     * @param place
     */

    fetchProperties = (data, identifier) => {
        if (identifier === 'map') {
            findProperties(data).then(properties => this.setState({
                properties: properties
            }))
        }
        if (identifier === 'search') {
            findProperties(data).then(properties => this.setState({
                searchProperties: properties, initialLoad: false
            }))
        }
    }

    /**
     * React lifecycle hook for first time load.
     */
    componentDidMount() {
        this.fetchProperties({Latitude: -88, Longitude: 27, xRadius: 2050000}, 'map')
    }

    /**
     * Search Handler for Form
     * @param event
     * @param formData
     */
    handleSubmit = (event, formData) => {
        event.preventDefault();
        this.fetchProperties(formData, 'search')

    };

    /**
     * SPA Selection handler
     * @param e
     * @param type
     */
    handleClick = (e, type) => {
        e.preventDefault()
        if (type === 'home') {
            this.setState({searchType: '', isSelected: false})
        }
        else {
            this.setState({searchType: type, isSelected: true})
        }
    }

    render() {
        const {isSelected, searchType, properties, searchProperties, center} = this.state;
        return (
            <div>
                <button className='button1' disabled={!isSelected} onClick={e => this.handleClick(e, "home")}>Home</button>
                <h1>Welcome to Property Explorer App</h1>
                {(!isSelected) ?
                    <div>
                        <div className="box box-search" onClick={(e) => this.handleClick(e, "search")}>
                            <h2>Search By Coordinates</h2>
                        </div>
                        <div className="box box-map" onClick={(e) => this.handleClick(e, "map")}>
                            <h2>Search on Map</h2>
                        </div>
                    </div> :
                    (searchType === 'search') ?
                        <PropertySearch properties={searchProperties} center={center} initialLoad={this.state.initialLoad}
                                        handleSubmit={this.handleSubmit}/> :
                        (searchType === 'map') ?
                            <Map
                                google={this.props.google}
                                center={{lat: 32.715738, lng: -117.161083}}
                                height='400px'
                                zoom={12}
                                properties={properties}
                            /> : <div></div>
                }
            </div>

        );
    }
}

/**
 * Router Enabled App Component for details page
 * @returns {*}
 * @constructor
 */
export const App = () =>
    <Switch>
        <Route exact path="/" render={() => <PropertyApp/>}/>
        <Route path={`/property/:propertyId`} render={(props) => <PropertyDetails {...props}/>}/>
        <Route/>
    </Switch>


export default App;
