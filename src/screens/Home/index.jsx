// import styled from "styled-components/native";

// const TabBarSeparator = styled.View`
//   z-index: 1;
//   background-color: rgba(0, 0, 0, 0.15);
//   border-radius: 24px;
//   width: 1.5px;
//   height: 65px;
//   position: absolute;
//   bottom: 2.75%;
//   align-self: center;
// `;

import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
  FlatList,
  PermissionsAndroid,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import IoniconIcons from "react-native-vector-icons/Ionicons";
import WifiManager from "react-native-wifi-reborn";
import api from "../../services/api";

import io from "socket.io-client";

import Board from "../../components/Board";

import { styles, Divisor, Device } from "./styles";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wifiList, setWifiList] = useState([]);
  const [device, setDevice] = useState(null);
  const [psts, setPsts] = useState([]);

  function getWifiList() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location permission is required for WiFi connections",
        message:
          "This app needs location permission as this is required  " +
          "to scan for wifi networks.",
        buttonNegative: "DENY",
        buttonPositive: "ALLOW",
      }
    ).then(async (res) => {
      if (res !== PermissionsAndroid.RESULTS.GRANTED) return res;
      const wifiList = await WifiManager.loadWifiList();

      const newWifiList = wifiList.filter((wifi) => {
        return /^Board/.test(wifi.SSID);
      });

      setWifiList(newWifiList);
    });
  }

  // function selectDevice() {
  //   WifiManager.isEnabled().then((res) => {
  //     if (!res) WifiManager.setEnabled(true);
  //     setIsModalVisible(true);
  //     setTimeout(() => {
  //       Platform.OS === "android" && getWifiList();
  //     }, 1000);
  //   });
  // }

  function connectToBoard(SSID) {
    WifiManager.connectToProtectedSSID(SSID, "78558816", false)
      .then((res) => {
        Alert.alert("Success", "Now you are connected to your board!");
        setDevice(SSID);
        setIsModalVisible(false);
      })
      .catch(() => {
        Alert.alert(
          "Error",
          `Failed to connect to ${SSID}!\n\nTry to restart your board.`
        );
        return getWifiList();
      });
  }

  // async function connServer() {
  //   api
  //     .get("/pikkas")
  //     .then((res) => {
  //       setPsts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  // function fetchNewMovement() {
  //   api
  //     .get("/pikkas")
  //     .then((res) => {
  //       setPsts([...psts, res.data[res.data.length - 1]]);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  const DeviceModalContent = () => {
    return (
      <LinearGradient
        colors={["#FFFFFF", "#D4F1F4"]}
        start={{ x: 0.5, y: 0 }}
        end={{
          x: 0.5,
          y: 1.4338,
        }}
        style={styles.deviceModalContent}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Devices</Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
          >
            <IoniconIcons name="close" size={36} />
          </TouchableOpacity>
        </View>
        <Divisor marginVertical={24} opacity={0.25} color="black" />
        <FlatList
          data={wifiList}
          keyExtractor={(item) => {
            return item.BSSID;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  connectToBoard(item.SSID);
                }}
              >
                <Device>
                  <Image source={require("../../assets/icons/chessIcon.png")} />
                  <Text style={{ marginLeft: 24, fontSize: 20 }}>
                    {item.SSID}
                  </Text>
                </Device>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => {
            return (
              <Divisor
                width="90%"
                marginVertical={16}
                alignSelf="center"
                color="black"
                opacity={0.1}
              />
            );
          }}
        />
      </LinearGradient>
    );
  };

  function verifyConnection() {
    // setInterval(async () => {
    //   const isEnabled = await WifiManager.isEnabled();
    //   if (isEnabled) {
    //     const isConnected = await WifiManager.connectionStatus();
    //     const currentSSID = await WifiManager.getCurrentWifiSSID();
    //     if (isConnected && /^Board/.test(currentSSID)) {
    //       setDevice(currentSSID);
    //     } else {
    //       setDevice(null);
    //     }
    //   }
    // }, 1000);
  }

  useEffect(() => {
    // verifyConnection();
    // connServer();
    // setTimeout(() => {
    //   setInterval(fetchNewMovement, 2000);
    // }, 2000);

    const socket = io("https://tcc-app-back.herokuapp.com/");

    socket.on("connection", (s) => {
      socket.on("allPlays", (plays) => {
        setPsts(plays);
      });

      socket.on("play", (play) => {
        setPsts([...psts, play]);
      });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/backgrounds/background.png")}
      >
        <Text style={styles.title}>Board</Text>
        <Divisor />
        {device ? (
          <View style={styles.selectDeviceContainer}>
            <Text style={styles.subtitle}>{device}</Text>
            <Image
              style={styles.wifiIcon}
              source={require("../../assets/icons/wifiIcon.png")}
            />
          </View>
        ) : (
          <TouchableOpacity
          // onPress={selectDevice}
          >
            <View style={styles.selectDeviceContainer}>
              <Text style={styles.subtitle}>Select the board</Text>
              <Image
                style={styles.wifiIcon}
                source={require("../../assets/icons/wifiIcon.png")}
              />
            </View>
          </TouchableOpacity>
        )}

        {device ? (
          <View>
            <Board psts={psts} />
          </View>
        ) : (
          <View>
            <Text>Not connected!</Text>
          </View>
        )}
        <Board psts={psts} />
      </ImageBackground>
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={{ margin: 0 }}
        children={DeviceModalContent()}
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          setIsModalVisible(false);
        }}
        hideModalContentWhileAnimating
      />
    </View>
  );
};

export default Home;
