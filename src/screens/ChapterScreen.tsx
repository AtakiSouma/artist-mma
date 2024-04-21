import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { CourseContent } from "../models/course.model";
import VideoComponent from "../components/video/VideoComponents";
import HeaderDetailScreen from "../components/HeaderDetailScreen";
import ButtonComponent from "../components/button/ButtonComponent";
import SectionComponent from "../components/Global/SectionComponent";
import TextComponent from "../components/Global/TextComponent";
import SpaceComponent from "../components/Global/SpaceComponent.";
import DescriptionComponent from "../components/DescriptionComponent";
import IconCard from "../components/detailScreen/IconCard";
import {
  Entypo,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { appColors } from "../constants/appColors";
import ClipBoardComponent from "../components/ClipBoard";
import RowComponents from "../components/Global/RowComponents";
import InputComponent from "../components/Input/InputComponents";
import TextSectionComponent from "../components/TextSectionComponen";
const ChapterScreen = ({ route, navigation }: any) => {
  const { item }: { item: CourseContent } = route.params;
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  return (
    <View style={{ backgroundColor: "#F6F8FC", flex: 1 }}>
      <HeaderDetailScreen
        openDrawer={() => navigation.openDrawer()}
        goBack={() => navigation.goBack()}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SectionComponent>
          <TextComponent title text={item.title} />
          <SpaceComponent height={20} />
          <VideoComponent videoUrl={item.videoUrl} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Video description"} />
          <DescriptionComponent description={item.description} />
        </SectionComponent>
        <SectionComponent>
          <TextComponent title text={"Link Suggestion"} />
          <>
            {item.links.map((item, index) => (
              <View key={item._id}>
                <IconCard
                  icon={
                    <Entypo name="link" size={24} color={appColors.primary} />
                  }
                  title={item.title}
                />
                <ClipBoardComponent url={item.url} />
              </View>
            ))}
          </>
        </SectionComponent>

        {/* cooment */}
        <SectionComponent>
          <TextSectionComponent
            title={"Question here"}
            icon={
              <AntDesign
                name="questioncircleo"
                size={22}
                color={appColors.primary}
              />
            }
          />
          <InputComponent
            numberOfLine={4}
            onChange={(val) => setQuestion(val)}
            value={question}
            allowClear
            multiline
            placeholder="Your Question"
          />
          <TouchableOpacity onPress={() => {}}>
            <View style={{}}>
              <Image
                source={{
                  uri: image
                    ? image
                    : "https://cdn.iconscout.com/icon/free/png-256/free-upload-30-83583.png",
                }}
                style={{ width: 100, height: 100, resizeMode: "cover" }}
              />
            </View>
          </TouchableOpacity>
          <ButtonComponent
            iconFlex="right"
            styles={{ width: 130 }}
            icon={<FontAwesome name="send" size={20} color={appColors.white} />}
            text="Submit"
            type="primary"
          />
        </SectionComponent>

        <SpaceComponent height={300} />
        <SectionComponent>
          <RowComponents>
            <ButtonComponent text="Previous " type="primary" />
            <ButtonComponent text="Next" type="primary" />
          </RowComponents>
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default ChapterScreen;

const styles = StyleSheet.create({});
