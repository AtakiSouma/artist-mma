import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import FilterScreen from "../screens/FilterScreen";
import DetailsScreen from "../screens/DetailsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BuySuccessScreen from "../screens/BuySuccessScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="DetailScreen" component={DetailsScreen} />
      <Stack.Screen name="SuccessScreen" component={BuySuccessScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
