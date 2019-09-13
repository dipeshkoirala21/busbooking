import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";


class DateTime extends Component {
  state = {
    isVisible: false,
    isRetunTimePickerVisible: false,

  };
  //pickup time
  _handlePicker = datetime => {
    this.setState({
      isVisible: false,
      // chosenDateTime: moment(datetime).format("MMMM, Do YYYY, HH:mm")
    });
    this.props.handlePicker(datetime)
  };
  _hidePicker = () => {
    this.setState({
      isVisible: false
    });
  };
  _showPicker = () => {
    this.setState({
      isVisible: true
    });
  };
  //return time
  _handleReturnTimePicker = time => {
    this.setState({
      isRetunTimePickerVisible: false,
      // chosenReturnTime: moment(time).format("HH:mm")
    });
    this.props.handleReturnTimePicker(time)
  };
  _hideReturnTimePicker = () => {
    this.setState({
      isRetunTimePickerVisible: false
    });
  };
  _showReturnTimePicker = () => {
    this.setState({
      isRetunTimePickerVisible: true
    });
  };

  render() {
    return (
      <View>
        <View >
          <TouchableOpacity
            onPress={this._showPicker}
            style={{
              marginTop: 10,
              backgroundColor: "green",
              width: 300,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "white",
              borderRadius: 4,
              borderWidth: 1
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>
              Select Pickup Date and Time
            </Text>
          </TouchableOpacity>

          <DateTimePicker
            mode={"datetime"}
            isVisible={this.state.isVisible}
            onConfirm={this._handlePicker}
            onCancel={this._hidePicker}
            is24Hour={true}
          />
          <TouchableOpacity
            onPress={this._showReturnTimePicker}
            style={{
              marginTop: 10,
              backgroundColor: "red",
              width: 300,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "white",
              borderRadius: 4,
              borderWidth: 1
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>
              Select Drop Date and Time
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            mode={"datetime"}
            isVisible={this.state.isRetunTimePickerVisible}
            onConfirm={this._handleReturnTimePicker}
            onCancel={this._hideReturnTimePicker}
            is24Hour={true}
          />
        </View>
      </View>
    );
  }
}
export default DateTime;
