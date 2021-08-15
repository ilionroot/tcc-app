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
    fontSize: 22,
    fontWeight: "bold",
  },
  subSubTitle: {
    color: "white",
    fontSize: 20,
  },
  settingsContainer: {},
  sectionBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  changePasswordButton: {
    backgroundColor: "#2881a7",

    width: "100%",
    height: 75,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  changePasswordButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#ffffffff",
    width: "100%",
    marginTop: "25%",
    alignSelf: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 24,
    paddingTop: 8,
    overflow: "hidden",
    paddingBottom: 24,
  },
  modalHeader: {
    width: "100%",
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeaderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0,90,128,0.65)",
  },
  textInput: {
    height: 50,
    borderBottomColor: "rgb(0,90,128)",
    borderBottomWidth: 1,
    margin: 12,
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
