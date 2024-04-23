import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import TextComponent from "../../components/Global/TextComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { FontAwesome } from "@expo/vector-icons";
import { appColors } from "../../constants/appColors";

const ProfileScreen = () => {
  const auth = useAppSelector((state) => state.auth);
  // console.log(auth.currentUser.photo);

  return (
    <>
      <View style={{ width: "100%" }}>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.ZZctclEOrBiAuWKj2wtKGAHaFj?rs=1&pid=ImgDetMain",
          }}
          resizeMode="cover"
          style={{
            marginTop: 10,
            height: 250,
            width: "100%",
          }}
        />
      </View>
      <View
        style={{
          zIndex:1,
          position:'absolute',
          top:200,
          left:50,
          flex: 1,
          justifyContent: "flex-start",
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
          style={{ borderRadius: 9999, width: 100, height: 100,

            borderWidth:5,
            borderColor:appColors.primary
           }}
        />
        <TextComponent text={auth.currentUser.name || "User"} title />
        <TextComponent text={auth.currentUser.email || "User Email"} title />
        <TextComponent
          text={auth.currentUser.familyName || "Family Name"}
          title
        />
        {/* <TextComponent
          text={auth.currentUser.givenName || "Family Name"}
          title
        /> */}
        <ButtonComponent
          iconFlex="right"
          styles={{ width: 170 }}
          icon={<FontAwesome name="edit" size={20} color={appColors.white} />}
          text="Edit Profile"
          type="primary"
        />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
