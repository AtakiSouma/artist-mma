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
      "https://s3-alpha-sig.figma.com/img/7fcf/a0a6/cb93c081f5a11a628572cf2b57b5c461?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qIYr1r~IVmprZZN5I1ETIBEOiCtD~ng~cGPDIPFU150mGRQYDS5ADZ4PSlyZ2GqT8xkWIZPH1iAu325Z-vwXqkJqF19amHqtQrfIE4RNq84zkEl8~HE8ThpBX5W6tQcrW5flwvG96GeZpwyt7zDkj0wK21l5sXzAhFn5tcZ63oWRG0W3wqMA2R6uROj-srywAj-H9ONfWrxVphzzEXOh357eVtREVl3fnAHnbqvGpD1qT0MzooJ6I~sKY1WuvNpZXl4me4iJ0YF8ysrOAFDiU7w3kPsKNZxt9GaupQM9o0jKW~ieSjYLG~c2dD0Ium6NUYJtSWu25mz4I8odudvIJQ__",
  },
  {
    id: "2",
    image:
      "https://s3-alpha-sig.figma.com/img/f7c5/3e47/63f99732e3089fa66bd9646b0003446d?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K~mwpA7~yzamlo5Uzq7RoMKIWoQuIiCSdGZmf53qv2DHZL-P8sSLNTJ9KUC8SWwVsBpbgQYO637oAXwOQS-CHaDifR1VFTViDzkkZkknAj-bkS7QGAAAMHE7jQ1S7vcoQyrfrr8gWUv29u3tKKY9EOAPoMTAtdGpRN9XrdFbVm3QadtX-15V75E37llFp-ISdhJK9JoZZ-FXKdVkj1nQbZuDob5hj~j9lN8msbMp5VnBfUxHv8GFN4TuVz8qKlKjCRhZ8T7zB6BmHzGz0Ht0xCs6uZf-~loDQrDqejD19~rqd8zRbzxRYRppUsFqpS9PnqI7795gLl5TBTCakQTK5A__",
  },
  {
    id: "3",
    image:
      "https://res.cloudinary.com/didw3mt8i/image/upload/v1713122129/_70307379-f87a-4a2f-9de8-6611bc4de43e_oipgvp.jpg",
  },
  {
    id: "4",
    image:
      "https://res.cloudinary.com/didw3mt8i/image/upload/v1713122129/_62e4ff22-51e6-403f-b0c5-5249d9fc9676_uwllhz.jpg",
  },
];
const Slider = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ marginTop: 20, marginHorizontal: 10 }}>
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
                  width: appInfo.sizes.WIDTH * 1,
                  borderRadius: 10,
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
