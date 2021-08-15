import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
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

import { useAuth } from "../../contexts/auth";
import { Path, Svg } from "react-native-svg";
import IoniconIcons from "react-native-vector-icons/Ionicons";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

        <ControlsView
          behavior={Platform.select({
            ios: "padding",
            android: "height",
          })}
        >
          <Input
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="username"
          />
          <Input
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            returnKeyType="next"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="email"
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            onChangeText={(text) => setPassword(text)}
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
          />
          {loading ? (
            <ActivityIndicator
              style={{ marginTop: 48 }}
              color="white"
              size={48}
            />
          ) : (
            <LoginButton
              activeOpacity={0.5}
              onPress={async () => {
                setLoading(true);
                try {
                  await logIn(username, password);
                } catch {
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Text style={styles.loginButtonText}>Register</Text>
              <HelpButton
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IoniconIcons size={25} color="white" name="ios-caret-back" />
              </HelpButton>
            </LoginButton>
          )}
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

export default Register;
