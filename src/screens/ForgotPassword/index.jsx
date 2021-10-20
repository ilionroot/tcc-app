import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
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
import IoniconIcons from "react-native-vector-icons/Ionicons";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { sendVerifyEmail } = useAuth();

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
          {sended ? (
            <Input
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              returnKeyType="send"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="email"
              onKeyPress={() => {}}
            />
          ) : isVerified ? (
            <View>
              <Input
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                returnKeyType="send"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="email"
                onKeyPress={() => {}}
              />

              <Input
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                returnKeyType="send"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="email"
                onKeyPress={() => {}}
              />
            </View>
          ) : (
            <Input
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              returnKeyType="send"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              autoCompleteType="email"
              onKeyPress={() => {}}
            />
          )}

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
                  await sendVerifyEmail(email);
                } catch {
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Text style={styles.loginButtonText}>Send</Text>
              <HelpButton
                onPress={() => {
                  setSended(true);
                  navigation.navigate("Login");
                }}
              >
                <IoniconIcons size={25} color="white" name="ios-caret-back" />
              </HelpButton>
            </LoginButton>
          )}
        </ControlsView>
      </ImageBackground>
    </View>
  );
};

export default ForgotPassword;
