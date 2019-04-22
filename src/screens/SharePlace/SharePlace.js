import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ImagePreviewPicker from "../../components/ImagePreviewPicker/ImagePreviewPicker";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickLocation from "../../components/PickLocation/PickLocation";

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };
  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      image: {
        value: null,
        valid: false
      }
    }
  };
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigarotEvent);
  }
  onNavigarotEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeAddedHandler = placeName => {
    if (this.state.placeName.trim() !== "") {
      this.props.onAddPlace(
        this.state.controls.placeName,
        this.state.controls.image.value
      );
    }
  };
  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <ImagePreviewPicker onImagePicked={this.imagePickedHandler} />
          <PickLocation />
          <PlaceInput
            placeName={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the Place"
              onPress={this.placeAddedHandler}
              // disabled={
              //   !this.state.controls.placeName.valid ||
              //   !this.state.controls.image.valid
              // }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, image) => dispatch(addPlace(placeName, image))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
