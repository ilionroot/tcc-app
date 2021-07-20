import { StyleSheet } from "react-native";
import styled from "styled-components";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === "android" ? "5%" : "15%",
  },
  title: {
    color: "white",
    fontSize: 48,
    marginTop: -8,
  },
  subtitle: {
    color: "white",
    fontSize: 24,
  },
  settingsContainer: {},
  sectionBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export const Divisor = styled.View`
  width: ${(props) => {
    return props.width ? props.width : "100%";
  }};
  height: 1px;
  opacity: 0.5;
  background-color: ${(props) => {
    return props.color ? props.color : "white";
  }};
  opacity: ${(props) => {
    return props.opacity ? props.opacity : 1;
  }};
  margin-top: ${(props) => {
    return props.marginVertical ? `${props.marginVertical}px` : "8px";
  }};
  margin-bottom: ${(props) => {
    return props.marginVertical ? `${props.marginVertical}px` : "8px";
  }};
  margin-left: ${(props) => {
    return props.marginHorizontal ? `${props.marginHorizontal}px` : 0;
  }};
  margin-right: ${(props) => {
    return props.marginHorizontal ? `${props.marginHorizontal}px` : 0;
  }};
  align-self: ${(props) => {
    return props.alignSelf ? props.alignSelf : "flex-start";
  }};
`;
