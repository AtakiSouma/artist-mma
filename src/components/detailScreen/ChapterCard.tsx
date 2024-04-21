import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CourseContent } from "../../models/course.model";
import CardComponents from "../CardComponents";
import TextComponent from "../Global/TextComponent";
import RowComponents from "../Global/RowComponents";
import { appColors } from "../../constants/appColors";
import SpaceComponent from "../Global/SpaceComponent.";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
type Props = {
  data: CourseContent;
  handleNavigation?: any;
  index: number;
};
const ChapterCard = (props: Props) => {
  const { data, handleNavigation, index } = props;

  return (
    <CardComponents isShadow  onPress={handleNavigation}>
      <RowComponents
        justify="space-between"
        styles={{ alignContent: "center", alignItems: "center" ,padding:5}}
      >
        <RowComponents
          justify="flex-start"
          styles={{ alignContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 43,
              fontWeight: "800",
              color: appColors.gray,
            }}
          >
            0{index}
          </Text>
          <SpaceComponent width={10} />
          <TextComponent text={data.title} styles={{ fontSize: 17 }} />
        </RowComponents>
        <MaterialIcons name="draw" size={30} color={appColors.primary} />
      </RowComponents>
    </CardComponents>
  );
};

export default ChapterCard;

const styles = StyleSheet.create({});
