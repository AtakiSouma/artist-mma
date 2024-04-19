import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import TextComponent from "../../components/Global/TextComponent";

const ProfileScreen = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri:
            auth.currentUser.photo ||
            "https://static.wikia.nocookie.net/houkai-star-rail/images/2/22/Profile_Picture_Sparkle_-_Illusion.png/revision/latest/thumbnail/width/360/height/360?cb=20240206032940",
        }}
        style={{ borderRadius: 9999, width: 100, height: 100 }}
      />
      <TextComponent text={auth.currentUser.name || "User"} title />
      <TextComponent text={auth.currentUser.email || "User Email"} title />
      <TextComponent
        text={auth.currentUser.familyName || "Family Name"}
        title
      />
      <TextComponent text={auth.currentUser.givenName || "Family Name"} title />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
