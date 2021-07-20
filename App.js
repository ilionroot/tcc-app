import React, { useState } from "react";
import { StatusBar, Image, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText } from "react-native-global-props";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { AuthProvider } from "./src/contexts/auth";
import { navigationRef } from "./src/RootNavigation";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";

const TabStack = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AppRoutes = () => {
  return (
    <TabStack.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 100,
          width: "100%",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: "absolute",
          bottom: 0,
          left: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#189AB4",
          overflow: "hidden",
        },
        tabStyle: {
          width: "50%",
          height: "100%",
        },
      }}
      initialRouteName="Home"
    >
      <TabStack.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 32, height: 32 }}
                source={require("./src/assets/icons/homeIcon.png")}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <TabStack.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 32, height: 32 }}
                source={require("./src/assets/icons/settingsIcon.png")}
              />
            );
          },
        }}
        name="Settings"
        component={Settings}
      />
    </TabStack.Navigator>
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
      <RootStack.Screen name="Login" component={Login} />
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
