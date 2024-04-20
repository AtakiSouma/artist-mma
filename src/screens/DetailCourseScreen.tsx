import {
  Alert,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Course } from "../models/course.model";
import { Video, ResizeMode } from "expo-av";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderDetailScreen from "../components/HeaderDetailScreen";
import ImageComponent from "../components/ImageComponent";
import { appInfo } from "../constants/appInfos";
import SectionComponent from "../components/SectionComponents";
import TextComponent from "../components/Global/TextComponent";
import IconCard from "../components/detailScreen/IconCard";
import { appColors } from "../constants/appColors";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import StarComponent from "../components/StarComponent";
import DescriptionComponent from "../components/DescriptionComponent";
import VideoComponent from "../components/video/VideoComponents";
import { UserData } from "../models/user.model";
import userApi from "../api/userApi";
import AvatarComponent from "../components/AvatarComponents";
import AvatarDetailScreen from "../components/detailScreen/AvatarDetailScreen";
import ButtonComponent from "../components/button/ButtonComponent";
import CircleComponent from "../components/Global/CircleComponent";
import SpaceComponent from "../components/Global/SpaceComponent.";
import paymentApi from "../api/paymentApi";
import { useStripe } from "@stripe/stripe-react-native";
const DetailCourseScreen = ({ route, navigation }: any) => {
  const { item }: { item: Course } = route.params;
  const [instructor, setInstructors] = useState<UserData>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  //TODO: fetch data instructor
  const fetchInstructorsData = async () => {
    const api = `/instructor/${item.instructor}`;
    const res = await userApi.HandleUserApi(api, {}, "get");
    setInstructors(res.data);
  };
  useEffect(() => {
    fetchInstructorsData();
  }, [setInstructors]);
  // TODO:END
  // TODO : get payment
  const [secret_stripe, setSecret_Stripe] = useState();
  const handlePayment = async () => {
    const api = "/intents";
    const res = await paymentApi.HandlePaymentApi(
      api,
      {
        amount: Math.floor(item.price * 100),
      },
      "post"
    );
    setSecret_Stripe(res.data);
    console.log("hello", secret_stripe);
  };
  //TODO: check out
  const onCheckout = async () => {
    // 1. Create a payment intent
    await handlePayment();

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Ataki Souma Learning System",
      paymentIntentClientSecret: secret_stripe,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Some error occurred");
      return;
    }
    // 3. Present the Payment Sheet from Stripe
    await presentPaymentSheet();
    Alert.alert("Payment Sheet sucessfully");
    // 4. If payment ok -> create the order
    // onCreateOrder();
  };
  return (
    <View style={{ backgroundColor: "#F6F8FC", flex: 1 }}>
      <HeaderDetailScreen openDrawer={() => navigation.openDrawer()} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* TODO:Header */}

        <ImageComponent
          stylesImage={{
            width: appInfo.sizes.WIDTH * 0.9,
            height: 200,
            borderRadius: 10,
          }}
          url={item.thumbnail.url}
        />
        <SectionComponent>
          <TextComponent
            text={item.name || "no name"}
            title
            styles={{ fontWeight: "900" }}
          />
        </SectionComponent>
        <SectionComponent>
          <IconCard
            icon={
              <MaterialIcons
                variant="Bold"
                color={appColors.primary}
                size={24}
                name="category"
              />
            }
            title={item.categories.title}
          />
          <IconCard
            icon={
              <MaterialIcons
                variant="Bold"
                color={appColors.primary}
                size={24}
                name="rotate-90-degrees-cw"
              />
            }
            title={item.level}
          />
          <IconCard
            icon={
              <Feather name="book-open" size={24} color={appColors.primary} />
            }
            title={`${item.courseContentData.length} ${
              item.courseContentData.length > 0 ? "chapters" : "chapter"
            } `}
          />
          <StarComponent rate={item.ratings} totalReview={2} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Instructor"} />
          <AvatarDetailScreen
            url={instructor?.photoUrl}
            name={instructor?.name}
            email={instructor?.email}
          />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Description"} />
          <DescriptionComponent description={item.description} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Video introduction"} />
          <VideoComponent videoUrl={item.demoUrl} />
        </SectionComponent>
        <TextComponent text={item.instructor || "no instructors"} />
      </ScrollView>
      <SpaceComponent height={100} />
      <SectionComponent
        styles={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <ButtonComponent
          onPress={onCheckout}
          type="primary"
          text={` Enroll with ${item.price}$`}
          textStyles={{ fontSize: 100, fontWeight: "bold" }}
          iconFlex="right"
          icon={
            <CircleComponent color={appColors.buttonBackground}>
              <AntDesign name="arrowright" size={24} color={appColors.white} />
            </CircleComponent>
          }
        />
      </SectionComponent>
    </View>
  );
};

export default DetailCourseScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
