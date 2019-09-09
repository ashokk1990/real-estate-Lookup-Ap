/**
 *
 * @type {{BASE_URL: string, OVERLAY: string, BUILDING: string, PARCEL: string}}
 */
const Api = {
    BASE_URL: "http://localhost:1235",
    OVERLAY: "yes",
    BUILDING: "Green",
    PARCEL: "orange"
}

/**
 * Fetch Properties from server and store them in state.
 * When the user types an address in the search box
 * @param place
 */

export const findProperties = async (data) => {
    try {
        const response = await fetch(`${Api.BASE_URL}/find`, {
            method: 'post',
            withCredentials: true,
            body: JSON.stringify({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [parseInt(data.Latitude), parseInt(data.Longitude)] // -87.6432173, 26.8849731
                },
                "x-distance": parseInt(data.xRadius)
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return response.json()
    } catch (e) {
        console.log(e)
    }
}


export default Api;
