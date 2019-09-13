import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Button,
  ToastAndroid,
  Dimensions,
} from "react-native";
import moment from 'moment'

import DateTimePicker from "./components/DateTimePicker";
import MapView from 'react-native-maps';
import Markers from "./components/Marker";
import MapViewDirections from 'react-native-maps-directions';

import EStyleSheet from 'react-native-extended-stylesheet'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCtsGPPPcuhdnsHpgVblHV1GMI5Zeshgv0'

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class App extends React.Component {
  state = {
    chosenDateTime: "",
    chosenReturnTime: "",
    currentLocation: {
      latitude: 27.6659645,
      longitude: 85.340695,
    },
    destinationLocation: {
      latitude: 27.6659645,
      longitude: 85.340695,
    },
    modalVisible: false,
    focusedLocation: {
      latitude: 27.7900352,
      longitude: 85.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122,
    },
  }
  setModalVisible(visible) {
    if (visible === "good") {
      this.setState({ modalVisible: visible });
      return (ToastAndroid.show('Booking Conformed', ToastAndroid.SHORT))
    }
    this.setState({ modalVisible: visible });
  }
  _handlePicker = datetime => {
    this.setState({
      // isVisible: false,
      chosenDateTime: moment(datetime).format("DD/MM/YYYY HH:mm:ss")
    });
  };
  _handleReturnTimePicker = time => {
    this.setState({
      // isRetunTimePickerVisible: false,
      chosenReturnTime: moment(time).format("DD/MM/YYYY HH:mm:ss")
    });
  };

  mapHandler = (currentLocation, destinationLocation) => {
    console.log('current', currentLocation)
    console.log('destination', destinationLocation)
    this.setState({
      currentLocation,
      destinationLocation
    })
  }

  bookHandler = () => {
    var EIGHT_HOUR = 60 * 60 * 8000;
    var THREE_HOUR = 60 * 60 * 3000;


    var diff = moment.utc(moment(this.state.chosenReturnTime, "DD/MM/YYYY HH:mm:ss").diff(moment(this.state.chosenDateTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss").split(':');

    var time = diff[0] * 60 * 60 * 1000 + diff[1] * 60 * 1000 + diff[2] * 1000;
    // console.log(typeof time)
    if (this.state.chosenDateTime === "" || this.state.chosenReturnTime === "") {
      ToastAndroid.show('Please Select the Pickup and Drop Time', ToastAndroid.SHORT)
    } else if (time > EIGHT_HOUR || time < THREE_HOUR) {
      ToastAndroid.show('Time should be greater than 3 hrs and not more than 8 hrs', ToastAndroid.LONG)
      this.setModalVisible(false)


    } else {
      this.setModalVisible(true)
    }



  }

  render() {
    console.log("coordinate", this.state)
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{
            backgroundColor: "#1E4291",
            width: "100%",
            height: 100,
            alignItems: "center",
            justifyContent: "flex-start",
            elevation: 3
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginTop: 45
            }}
          >
            Bus Booking System
        </Text>
        </ImageBackground>
        <View style={styles.shadowView}>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: "center"
            }}
          >
            <Text>Journey Date and Time</Text>
          </View>
          <View style={styles.searchSection}>
            <DateTimePicker chosenDateTime={this.state.chosenDateTime} chosenReturnTime={this.state.chosenReturnTime} handlePicker={this._handlePicker} handleReturnTimePicker={this._handleReturnTimePicker} />
          </View>
        </View>
        <Text style={{ marginTop: 30 }}>Select Destination Location</Text>
        <View
          style={{
            width: "80%",
            height: 400,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Markers mapHandler={this.mapHandler} />
          <View style={{ flexDirection: "column-reverse" }}>
            <TouchableOpacity
              onPress={this.bookHandler}
              style={{
                backgroundColor: "green",
                width: 300,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "white",
                borderRadius: 4,
                borderWidth: 1,
                bottom: 10
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>
                Book Bus Service
            </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Pick TIme: {this.state.chosenDateTime}</Text>
              <Text>Drop TIme: {this.state.chosenReturnTime}</Text>
              <Text>Current Location: {this.state.currentLocation.latitude} and {this.state.currentLocation.longitude}</Text>
              <Text>Destination Location: {this.state.destinationLocation.latitude} and {this.state.destinationLocation.longitude}</Text>

              <MapView
                initialRegion={this.props.focusedLocation}
                style={styles.map}
              >
                <MapView.Marker coordinate={this.state.currentLocation} />
                <MapView.Marker coordinate={this.state.destinationLocation} />
                <MapViewDirections origin={this.state.currentLocation}
                  destination={this.props.destinationLocation}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeColors="blue"
                  strokeWidth={3}
                  optimizeWaypoints={true}



                />
              </MapView>
              {/* <MapView initialRegion={this.state.focusedLocation}>
                <MapView.Marker coordinate={this.state.focusedLocation} />
                <MapView.Marker coordinate={this.state.focusedLocation} />
                <MapViewDirections
                  origin={this.state.currentLocation}
                  destination={this.props.destinationLocation}
                  apikey={GOOGLE_MAPS_APIKEY}
                />
              </MapView> */}
              <View>
                <Button title="Confirm" onPress={() => this.setModalVisible("good")} />
                <Button title="Cancel" onPress={() => this.setModalVisible(false)} color="red" />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  shadowView: {
    width: "80%",
    height: 140,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 3
  },
  searchSection: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    borderStyle: "solid",
    justifyContent: "space-evenly",
    marginHorizontal: 15,
    marginTop: 5
  },
  map: {
    width: '100%',
    height: 250,
  },
});
export default App
