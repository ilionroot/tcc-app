import styled from "styled-components/native";
import { StyleSheet, Platform, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: "12.5%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 64,
    marginTop: -8,
  },
  subtitle: {
    color: "white",
    fontSize: 32,
  },
  loginButtonText: {
    width: 173,
    paddingLeft: "30%",
    fontSize: 18,
  },
});

export const Divisor = styled.View`
  width: 60%;
  height: 1px;
  opacity: 0.5;
  background-color: white;
  margin: 8px 0;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "rgba(255, 255, 255, 0.20)",
})`
  border-bottom-width: 1px;
  border-bottom-color: white;
  padding: 15px 0;
  margin-bottom: 25px;
  width: 223px;
  color: white;
`;

export const Waves = styled.View`
  width: ${(props) => Dimensions.get("screen").width}px;
  height: 100px;
  position: absolute;
  bottom: 0;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 223px;
  height: 49px;
  border-radius: 8px;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 50px;
  elevation: 2;
`;

export const HelpButton = styled.TouchableOpacity`
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #189ab4;
`;

export const ControlsView = styled.KeyboardAvoidingView`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;
