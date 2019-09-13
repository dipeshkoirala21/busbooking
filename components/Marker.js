import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 27.7900352,
      longitude: 85.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122,
    },
    locationChosen: false,
    location: {},
    currentLocation: {},
    destinationLocation: {}
  };
  pickLocationHandler = (event, loc) => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    this.setState(state => {
      return {
        focusedLocation: {
          ...state.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        locationChosen: true,
        [loc]: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      };
    }, () => {
      this.props.mapHandler(this.state.currentLocation, this.state.destinationLocation)
    }
    )
    this.onLocationPicker({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  onLocationPicker = location => {
    this.setState({
      location: location
    });
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvents = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        };
        this.pickLocationHandler(coordsEvents, "currentLocation");
      },
      err => {
        console.log(err);
        alert('Fetching error');
      }
    );
  }
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvents = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        };
        this.pickLocationHandler(coordsEvents, "destinationLocation");
      },
      err => {
        console.log(err);
        alert('Fetching error');
      }
    );
  };
  render() {
    console.log('marker', this.state.destinationLocation)
    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={(e) => this.pickLocationHandler(e, "destinationLocation")}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 350,
  },
  button: {
    margin: 8,
  },
});
export default PickLocation;
