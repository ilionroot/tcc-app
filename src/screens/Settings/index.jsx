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

import React, { useState } from "react";
import {
  Text,
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";

import { useAuth } from "../../contexts/auth";
import { styles, Divisor } from "./styles";

const Settings = () => {
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");

  const { user, logOut } = useAuth();

  function toggleModal() {
    setIsChangePasswordModalVisible((s) => !s);
  }

  function changePassword() {
    toggleModal();
  }

  function changePasswordModalContent() {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        style={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>Change password</Text>
          <TouchableOpacity activeOpacity={0.65} onPress={toggleModal}>
            <MaterialIcons name="close" color="gray" size={32} />
          </TouchableOpacity>
        </View>
        <Divisor marginVertical={8} color="rgba(0,90,128,1)" />
        <View>
          <Text
            style={{
              ...styles.subSubTitle,
              color: "rgba(0,90,128,0.4)",
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Old Password
          </Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
          />
          <Text
            style={{
              ...styles.subSubTitle,
              color: "rgba(0,90,128,0.4)",
              fontWeight: "bold",
            }}
          >
            New Password
          </Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
          />
          <Text
            style={{
              ...styles.subSubTitle,
              color: "rgba(0,90,128,0.4)",
              fontWeight: "bold",
            }}
          >
            Confirm New Password
          </Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            autoCompleteType="password"
          />
        </View>
        <Text
          style={{
            color: "rgba(0,0,0,0.25)",
            marginTop: 36,
            textAlign: "center",
          }}
        >
          Keep your password safe! We will never personally request that.
        </Text>
        <TouchableOpacity
          activeOpacity={0.65}
          style={{
            ...styles.changePasswordButton,
            height: 65,
            position: "absolute",
            bottom: 0,
          }}
          onPress={changePassword}
        >
          <Text style={styles.changePasswordButtonText}>Change password</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

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
              <Text style={{ ...styles.subtitle, opacity: 0.5 }}>
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
            <Divisor marginVertical={24} />
            <View
              style={{
                ...styles.sectionBox,
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <Text
                style={{ ...styles.subtitle, opacity: 0.5, marginBottom: 12 }}
              >
                Username:
              </Text>
              <Text style={styles.subSubTitle}>{user.username}</Text>
            </View>
            <View
              style={{
                ...styles.sectionBox,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              s
            >
              <Text
                style={{ ...styles.subtitle, opacity: 0.5, marginBottom: 12 }}
              >
                E-mail:
              </Text>
              <Text style={styles.subSubTitle}>
                {user.email ? user.email : "iguinho220712@gmail.com"}
              </Text>
            </View>
            <Divisor marginVertical={36} />
            <TouchableOpacity
              activeOpacity={0.65}
              style={styles.changePasswordButton}
              onPress={toggleModal}
            >
              <Text style={styles.changePasswordButtonText}>
                Change password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={isChangePasswordModalVisible}
          children={changePasswordModalContent()}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{ margin: 0 }}
          onBackButtonPress={() => {
            setIsModalVisible(false);
          }}
          hideModalContentWhileAnimating
        />
      </ImageBackground>
    </View>
  );
};

export default Settings;
