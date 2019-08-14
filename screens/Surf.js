import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import {
  Text,
  View
} from 'react-native';
import { loggerFunc, locations } from '../locations.js';

export default class Map extends React.Component{
  state = {
    latitude: null,
    longitude: null,
    surfSpots: locations,
    locationData: {
      "swellHeight": '',
      "swellPeriod": '',
      "windGustKmph": '',
      "waterTemp": ''
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: {latitude, longitude} }) => this.setState({ latitude, longitude }, () => console.log("longitude:", longitude)), 
      (error) => console.log('error', error))
  }

  onMarkerPress = (surfSpot) => () => {
    loggerFunc(surfSpot.coords.latitude, surfSpot.coords.longitude)
    .then(dataObj => {
      this.setState({
        locationData: dataObj
      })
      console.log("this is the data", dataObj);
      console.log(this.state.locationData);
    }
    )
  }

  renderMarkers = () => {
    const { surfSpots } = this.state;
    return (
      <View>
        {
          surfSpots.map((spot, index) => {
            const { 
              coords: { latitude, longitude } 
            } = spot;
            return (
              <Marker
                key = {index}
                coordinate = {{ latitude, longitude }}
                onPress =  {this.onMarkerPress(spot)}
              >
                <MapView.Callout>
                  <Text>{spot.name}</Text>
                  <Text>Swell Height: {this.state.locationData.swellHeight}m</Text>
                  <Text>Swell Period: {this.state.locationData.swellPeriod} seconds</Text>
                  <Text>Wind Speed: {this.state.locationData.windGustKmph}Kmph</Text>
                  <Text>Water Temp: {this.state.locationData.waterTemp} C</Text>
                </MapView.Callout>
              </Marker>
            )
          })
        }
      </View>
    )
  }

    render() {
      const latitude = this.state.latitude;
      const longitude = this.state.longitude;
      if (latitude !== null) {
        return(
          <MapView 
            showsUserLocation
            style={{flex:1}} 
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            >
            {this.renderMarkers()}
          </MapView>
      );
      }
      return(
          <View>
            <Text>We need permissionss please!</Text>
          </View>
      );
    }
}



