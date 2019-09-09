FROM python:2.7

# Copy files (TODO: only copy required files, not all)
ADD . /code
WORKDIR /code

# Update pip and install dependencies
RUN pip install --upgrade pip
RUN pip install web.py psycopg2 Pillow geojson shapely

# Start development web server
CMD ["python", "server.py", "1235"]


# To build react app image

#FROM node:7.10 as build-deps
#WORKDIR /usr/src/app
#COPY package.json yarn.lock ./
#RUN yarn
#COPY . ./
#RUN yarn build
#
#FROM nginx:1.12-alpine
#COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# Command to build it : docker build . -t zestyai/ashok
# command to serve it: docker run -p 8080:80 zestyai/ashok:latest
# App will be served at localhost:8080
# Issues is I don't know how to run python app once running React app from Docker.
