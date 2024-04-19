import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import App from "../../../App";
import { appInfo } from "../../constants/appInfos";

interface SliderList {
  id: string;
  image: string;
}
const sliders: SliderList[] = [
  {
    id: "1",
    image:
      "https://res.cloudinary.com/didw3mt8i/image/upload/v1713191514/Screenshot_2024-04-15_213109_elipiu.png",
  },
  {
    id: "2",
    image:
      "https://res.cloudinary.com/didw3mt8i/image/upload/v1713191619/Screenshot_2024-04-15_213259_qzj5zo.png",
  },
  {
    id: "3",
    image:
      "https://res.cloudinary.com/didw3mt8i/image/upload/v1713191774/Screenshot_2024-04-15_213550_uh8hxr.png",
  },
];
const Slider = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ marginTop: 5, marginHorizontal: 10 }}>
        <FlatList
          data={sliders}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Image
                alt={item.id}
                source={{ uri: item.image }}
                style={{
                  height: 150,
                  width: appInfo.sizes.WIDTH * 0.7,
                  borderRadius: 20,
                  marginRight: 15,
                }}
              />
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Slider;
