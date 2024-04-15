import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { appInfo } from "../constants/appInfos";
import { appColors } from "../constants/appColors";
import { Svg } from "react-native-svg";
const image = {
  uri: "https://docs.expo.dev/static/images/tutorial/splash.png",
};

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={appColors.primary} size={80} animating={true} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
