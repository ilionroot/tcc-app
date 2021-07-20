// import styled from "styled-components/native";

// const TabBarSeparator = styled.View`
//   z-index: 999;
//   background-color: rgba(0, 0, 0, 0.15);
//   border-radius: 24px;
//   width: 1.5px;
//   height: 65px;
//   position: absolute;
//   bottom: 2.75%;
//   align-self: center;
// `;

import React from "react";
import {
  Text,
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useAuth } from "../../contexts/auth";
import { styles, Divisor } from "./styles";

const Settings = () => {
  const { user, logOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/backgrounds/background.png")}
      >
        <ScrollView>
          <Text style={styles.title}>Settings</Text>
          <Divisor marginVertical={24} />
          <View style={styles.settingsContainer}>
            <View style={styles.sectionBox}>
              <Text style={{ ...styles.subtitle, opacity: 0.75 }}>
                Logged with:
              </Text>
              <Text style={styles.subtitle}> {user.username}</Text>
              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={logOut}
              >
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Settings;
