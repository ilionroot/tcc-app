import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
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
import Modal from "react-native-modal";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  function modalContent() {
    return (
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.choiceButton}
          onPress={() => {
            setIsModalVisible(false);
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.choiceButtonText}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.choiceButton}
          onPress={() => {
            setIsModalVisible(false);
            navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={styles.choiceButtonText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
              <Text style={styles.loginButtonText}>Login</Text>
              <HelpButton
                onPress={() => {
                  setIsModalVisible(true);
                }}
              >
                <IoniconIcons size={25} color="white" name="help" />
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

        <Modal
          children={modalContent()}
          isVisible={isModalVisible}
          animationIn="zoomIn"
          animationOut="zoomOut"
          hideModalContentWhileAnimating
          style={{ margin: 0 }}
          onBackButtonPress={() => {
            setIsModalVisible(false);
          }}
          onBackdropPress={() => {
            setIsModalVisible(false);
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Login;
