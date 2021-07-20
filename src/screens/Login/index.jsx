import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import {
  styles,
  Divisor,
  LoginButton,
  HelpButton,
  Input,
  ControlsView,
  Waves,
} from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useAuth } from "../../contexts/auth";
import { Path, Svg } from "react-native-svg";
import IoniconIcons from "react-native-vector-icons/Ionicons";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staticScreenWidth = useRef(Dimensions.get("window").width);
  const { logIn } = useAuth();

  const afe = () => {
    // waveBottomT.value = Animated.withRepeat(
    //   Animated.withTiming((staticScreenWidth.current / 2) * -1, {
    //     duration: 1000,
    //   }),
    //   0,
    //   true
    // );
  };

  return (
    <View style={{ flex: 1, zIndex: 999 }}>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/backgrounds/loginBackground.png")}
      >
        <Text style={styles.subtitle}>Triforce</Text>
        <Divisor />
        <Text style={styles.title}>Tracker</Text>

        <ControlsView behavior="height">
          <Input
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <LoginButton
            onPress={() => {
              logIn(username, password);
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
            <HelpButton>
              <IoniconIcons size={25} color="white" name="help" />
            </HelpButton>
          </LoginButton>
        </ControlsView>
        <Svg viewBox="0 0 1320 500">
          <Path
            d="
              M0,192
              C220,100,440,100,660,192
              C880,290,1100,100,1320,192
              L1320 500
              L0 500
            "
            fill="#00d2d3"
          />
        </Svg>
      </ImageBackground>
    </View>
  );
};

export default Login;
