import React, { useState } from "react";
import { Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText } from "react-native-global-props";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { AuthProvider } from "./src/contexts/auth";
import { navigationRef } from "./src/RootNavigation";
import AntDesign from "react-native-vector-icons/AntDesign";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPassword from "./src/screens/ForgotPassword";
import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";

const AppStack = createMaterialBottomTabNavigator();
const AuthenticationStack = createStackNavigator();
const RootStack = createStackNavigator();

const AuthenticationRoutes = () => {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        header: () => {},
      }}
      initialRouteName="Login"
    >
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="Register" component={Register} />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </AuthenticationStack.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <AppStack.Navigator
      activeColor="#ffffff"
      inactiveColor="#005a7c"
      barStyle={{ backgroundColor: "#005a7c", paddingVertical: 12 }}
      shifting
      initialRouteName="Home"
    >
      <AppStack.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />

      <AppStack.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="user"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
          // tabBarLabel: ({ focused }) => {
          //   return (
          //     <Text
          //       style={{ marginBottom: 8, color: focused ? "white" : "black" }}
          //     >
          //       Settings
          //     </Text>
          //   );
          // },
        }}
        name="Settings"
        component={Settings}
      />
    </AppStack.Navigator>
  );
};

const RootRoutes = (props) => {
  setCustomText({
    style: {
      fontFamily: "quicksand-regular",
    },
  });

  return (
    <RootStack.Navigator initialRouteName="App" headerMode="none">
      <RootStack.Screen
        name="Authentication"
        component={AuthenticationRoutes}
      />
      <RootStack.Screen name="App" component={AppRoutes} />
    </RootStack.Navigator>
  );
};

const App = () => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);

  const [fontsLoaded] = useFonts({
    "quicksand-bold": require("./assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    "quicksand-light": require("./assets/fonts/Quicksand/Quicksand-Light.ttf"),
    "quicksand-medium": require("./assets/fonts/Quicksand/Quicksand-Medium.ttf"),
    "quicksand-regular": require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    "quicksand-semibold": require("./assets/fonts/Quicksand/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (isAnimationPlaying) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#05445E",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#05445E" />
        <LottieView
          source={require("./assets/splash.json")}
          autoPlay
          style={{
            width: "35%",
          }}
          loop={false}
          duration={2000}
          onAnimationFinish={() => {
            setTimeout(() => {
              setIsAnimationPlaying(false);
            }, 1000);
          }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" backgroundColor="#05445E" />
      <AuthProvider>
        <RootRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
