## Instructions to run: 

This App is bootstraped with Create-react-App.

From root dir:

Step 1: 
``yarn install``

Step 2:
``yarn build``

Step 3:

``yarn start``

go to localhost:3000

OR 

To serve your build files statically

``yarn server``

then go to localhost:5000


## Features Completed

* **Search:** Prompt the user for a longitude, latitude, and search radius (default 10000 meters) and display, in a tabular format (Instead Table was not looking great so I used CSS Grid Format to Display List), the results of the search, including the image of the property and its geographic location (longitude and latitude)
* **Detail Page:** Showed  detailed information about a given property, including its image, geographic location, and statistics. UI can be Improved here given more time.
* **Visual Search:** Using [Google Maps](https://developers.google.com/maps/documentation/), display a map based on the user's current location (or an address they enter), and display markers on the map for any property located on that map<sup>*</sup>.  
 (Implemented Took me most amount of time could be improved  more like Infowindow ran out of time not able to implement onclick functionality)
* **Freestyle:** Demonstrated use of some latest features of React including Hooks, Styled Components using CSS Grid
Functionality wise implemented Autocomplete using Google Api which is cool and working great.
## Deployment using Docker

To build react app image

```FROM node:7.10 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]```

 Command to build it : docker build . -t zestyai/ashok
 command to serve it: docker run -p 8080:80 zestyai/ashok:latest
 App will be served at localhost:8080




