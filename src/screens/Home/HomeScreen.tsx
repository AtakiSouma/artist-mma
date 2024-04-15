import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ButtonComponent from "../../components/button/ButtonComponent";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { removeAuth } from "../../redux/slide/authSlice";
import { globalStyles } from "../../style/globalStyles";
import { StatusBar } from "expo-status-bar";
import { appColors } from "../../constants/appColors";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import RowComponents from "../../components/Global/RowComponents";
import TextComponent from "../../components/Global/TextComponent";
import CircleComponent from "../../components/Global/CircleComponent";
import SpaceComponent from "../../components/Global/SpaceComponent.";
import TagComponent from "../../components/Global/TagComponent";
import CategoriesList from "../../components/Categories/CategoriesList";
import Slider from "../../components/Categories/Slider";
const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem("auth");

    dispatch(removeAuth());
  };
  const { getItem } = useAsyncStorage("auth");
  const auth = useAppSelector((state) => state.auth);
  console.log(auth.currentUser.name);
  if (!auth.currentUser.name) {
    return <></>;
  }
  console.log(auth.currentUser);
  return (
    <View style={globalStyles.container}>
      <StatusBar style="light" />
      <View style={styles.ContainerStyle}>
        <View style={styles.ContainerViewInTopBar}>
          <RowComponents>
            <GestureHandlerRootView>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <SimpleLineIcons
                  name="menu"
                  size={24}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </GestureHandlerRootView>
            <View style={{ flex: 1, alignItems: "center" }}>
              <RowComponents styles={{ gap: 5 }}>
                <TextComponent text="Hello" color={appColors.white2} />
                <MaterialCommunityIcons
                  name="hand-wave"
                  size={17}
                  color={appColors.white}
                />
              </RowComponents>
              <TextComponent
                flex={0}
                text={`${auth.currentUser.name}`}
                size={13}
                color={appColors.white}
              />
            </View>
            <CircleComponent color={appColors.buttonBackground} size={36}>
              <View>
                <Ionicons
                  name="notifications-sharp"
                  size={20}
                  color={appColors.white}
                />
                <View style={styles.babelIconInNotification} />
              </View>
            </CircleComponent>
          </RowComponents>
          <SpaceComponent height={25} />
          <RowComponents>
            <RowComponents
              styles={{ flex: 1 }}
              onPress={() =>
                navigation.navigate("SearchEvents", {
                  isFilter: false,
                })
              }
            >
              <FontAwesome
                name="search"
                variant="TwoTone"
                color={appColors.white}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  backgroundColor: appColors.gray2,
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
              />
            </RowComponents>
            <TagComponent
              onPress={() =>
                navigation.navigate("SearchEvents", {
                  isFilter: true,
                })
              }
              bgColor={appColors.buttonBackground}
              label="Filters"
              icon={
                <CircleComponent size={20} color={appColors.buttonBackground}>
                  <MaterialCommunityIcons
                    name="filter"
                    size={16}
                    color={appColors.white}
                  />
                </CircleComponent>
              }
            />
          </RowComponents>
          <SpaceComponent height={20} />
        </View>
        <View>
          <CategoriesList isFill />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Slider />
      </View>
    
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: appColors.primary,
    height: 178,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
  },
  ContainerViewInTopBar: {
    paddingHorizontal: 16,
    marginTop: 17,
  },
  babelIconInNotification: {
    backgroundColor: appColors.secondary,
    width: 10,
    height: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#524CE0",
    position: "absolute",
    top: -2,
    right: -2,
  },
});
