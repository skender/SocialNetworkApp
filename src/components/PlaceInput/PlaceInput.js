import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
  <DefaultInput
    placeholder="Place Name"
    onChangeText={props.onChangeText}
    value={props.placeName}
  />
);

export default placeInput;
