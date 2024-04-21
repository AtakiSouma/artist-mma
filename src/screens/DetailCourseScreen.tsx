import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  ScrollViewBase,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Course } from "../models/course.model";
import { Video, ResizeMode } from "expo-av";
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
  FontAwesome6,
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
import { PaymentMethod, useStripe } from "@stripe/stripe-react-native";
import { CaptureMethod } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import { useFocusEffect } from "@react-navigation/native";
import orderApi from "../api/orderApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { showSuccessToast } from "../util/toast";
import RowComponents from "../components/Global/RowComponents";
import BenefitComponents from "../components/detailScreen/BenefitComponents";
import ChapterCard from "../components/detailScreen/ChapterCard";
import {
  getUserInfoFailure,
  getUserInfoStart,
  getUserInfoSuccessAddAuth,
} from "../redux/slide/userSlice";
import LottieView from "lottie-react-native";
import { set } from "react-hook-form";
const DetailCourseScreen = ({ route, navigation }: any) => {
  const { item }: { item: Course } = route.params;
  const [instructor, setInstructors] = useState<UserData>();
  const [courseIsBrought, setCourseIsBrought] = useState<Boolean>(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const dispatch = useAppDispatch();
  // TODO:

  //TODO: fetch data instructor
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const fetchInstructorsData = async () => {
    try {
      const api = `/instructor/${item.instructor}`;
      const res = await userApi.HandleUserApi(api, {}, "get");
      setInstructors(res.data);
    } catch (error) {
      Alert.alert("Some thing went wrong in fetch Intructor");
      console.log("error in intructor fetching ", error);
    }
  };
  const handleGetUserInfo = async () => {
    dispatch(getUserInfoStart());
    try {
      const api = `/${auth.currentUser.id}`;
      const res = await userApi.HandleUserApi(api, {}, "get");
      dispatch(getUserInfoSuccessAddAuth(res.data));
      const isCourseBought = user.userData.courses?.some(
        (course) => course._id === item._id
      );
      setCourseIsBrought(isCourseBought);
    } catch (error) {
      console.log("error from fetching user info", error);
      dispatch(getUserInfoFailure());
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleGetUserInfo();
      fetchInstructorsData();
    }, [setInstructors, setCourseIsBrought])
  );

  console.log("instructors", instructor);
  // TODO:
  const [loading, setLoading] = useState(false);
  const handleCreateOrder = async () => {
    setLoading(true);
    const api = "/create";
    try {
      await orderApi.HandleOrderApi(
        api,
        {
          userId: auth.currentUser.id,
          courseId: item._id,
          payment_info: {
            Visa_Card: "4242424242424242",
            MM_YY: "23/24",
            CVC: "384",
            Country: "United States",
            ZipCode: "12345",
          },
        },
        "post"
      );
      await handleGetUserInfo();
      setLoading(false);
      navigation.navigate("SuccessScreen");
      showSuccessToast();
    } catch (error) {
      setLoading(false);
      Alert.alert("Some thing went wrong");
    }
  };

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
      Alert.alert("Some error occurred");
      return;
    }
    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();
    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }
    // 4. If payment ok -> create the order
    handleCreateOrder();
  };

  console.log("userData", user.userData);
  return (
    <View style={{ backgroundColor: "#F6F8FC", flex: 1 }}>
      <HeaderDetailScreen
        openDrawer={() => navigation.openDrawer()}
        goBack={() => navigation.goBack()}
      />
      <>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              autoPlay
              loop
              style={{
                marginTop: 1,
                width: appInfo.sizes.WIDTH * 1,
                height: appInfo.sizes.HEIGHT * 1,
                backgroundColor: "transparent",
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("../assets/animations/Loading.json")}
            />
            <TextComponent text={"Loading...."} />
          </View>
        ) : (
          <>
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
                url={
                  item.thumbnail.url
                    ? item.thumbnail.url
                    : "https://static.wikia.nocookie.net/houkai-star-rail/images/2/22/Profile_Picture_Sparkle_-_Illusion.png/revision/latest?cb=20240206032940"
                }
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
                    <Feather
                      name="book-open"
                      size={24}
                      color={appColors.primary}
                    />
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
                  url={
                    instructor?.photoUrl
                      ? instructor.photoUrl
                      : "https://static.wikia.nocookie.net/houkai-star-rail/images/2/22/Profile_Picture_Sparkle_-_Illusion.png/revision/latest?cb=20240206032940"
                  }
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

              <SectionComponent>
                <TextComponent title text={"Benefits"} />
                <>
                  {item.benefits.map((item, index) => (
                    <View key={item._id}>
                      <BenefitComponents
                        description={item.title}
                        icon={
                          <AntDesign
                            name="checkcircle"
                            size={20}
                            color={appColors.primary}
                          />
                        }
                        id={item._id}
                      />
                    </View>
                  ))}
                </>
              </SectionComponent>
              <SectionComponent>
                <TextComponent title text={"Prerequisites"} />

                <>
                  {item.prerequisites.map((item, index) => (
                    <View key={item._id}>
                      <BenefitComponents
                        description={item.title}
                        icon={
                          <MaterialIcons
                            name="privacy-tip"
                            size={24}
                            color={appColors.primary}
                          />
                        }
                        id={item._id}
                      />
                    </View>
                  ))}
                </>
              </SectionComponent>
              <SectionComponent>
                <TextComponent title text={"Course Content"} />
                <>
                  {item.courseContentData.map((item, index) => (
                    <View key={item._id}>
                      <ChapterCard
                        data={item}
                        index={index + 1}
                        handleNavigation={() =>
                          navigation.navigate("ChapterScreen", { item })
                        }
                      />
                    </View>
                  ))}
                </>
              </SectionComponent>
              <SpaceComponent height={300} />
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
                onPress={courseIsBrought ? () => {} : onCheckout}
                type="primary"
                text={
                  courseIsBrought ? "Study now" : `Enroll with ${item.price}$`
                }
                textStyles={{ fontSize: 100, fontWeight: "bold" }}
                iconFlex="right"
                icon={
                  <CircleComponent color={appColors.buttonBackground}>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={appColors.white}
                    />
                  </CircleComponent>
                }
              />
            </SectionComponent>
          </>
        )}
      </>
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
