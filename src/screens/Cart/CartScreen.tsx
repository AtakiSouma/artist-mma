import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import WatchData, { WatchProps } from "../../data/watch";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import RowComponents from "../../components/Global/RowComponents";
import ContainerComponent from "../../components/ContainerComponent";
import SpaceComponent from "../../components/Global/SpaceComponent.";
import InputComponent from "../../components/Input/InputComponents";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { appColors } from "../../constants/appColors";
import CardComponents from "../../components/CardComponents";
import TextComponent from "../../components/Global/TextComponent";
import TagComponent from "../../components/Global/TagComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircleComponent from "../../components/Global/CircleComponent";
import SectionComponent from "../../components/SectionComponents";
import LottieView from "lottie-react-native";
import { appInfo } from "../../constants/appInfos";
const CartScreen = ({ navigation }: any) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  useEffect(() => {
    AsyncStorage.getItem("bookmarks")
      .then((value) => {
        if (value !== null) {
          const bookmarksArray = JSON.parse(value);
          setBookmarks(bookmarksArray);
        }
      })
      .catch((error) => console.error("Error retrieving bookmarks: ", error));
  }, [bookmarks]);

  const data: WatchProps[] = WatchData;
  const [filteredData, setFilteredData] = useState<WatchProps[]>(WatchData);
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAutomatic, setIsAutomatic] = useState<boolean | null>(null);

  const handleSortByPrice = () => {
    setSortByPrice((prevSortByPrice) => {
      return prevSortByPrice === "asc" ? "desc" : "asc";
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleIsAutomatic = () => {
    setIsAutomatic((prevIsAutomatic) => {
      // Toggle between true, false, and null
      if (prevIsAutomatic === null) {
        return true;
      } else if (prevIsAutomatic === true) {
        return false;
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    let filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isAutomatic !== null) {
      filteredData = filteredData.filter(
        (item) => item.automatic === isAutomatic
      );
    }

    if (sortByPrice === "asc") {
      filteredData = [...filteredData].sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "desc") {
      filteredData = [...filteredData].sort((a, b) => b.price - a.price);
    }

    setFilteredData(filteredData);
  }, [searchQuery, sortByPrice, isAutomatic]);

  const renderAutomaticIcon = () => {
    if (isAutomatic === null) {
      return (
        <MaterialIcons name="auto-awesome" size={24} color={appColors.white} />
      );
    } else if (isAutomatic === true) {
      return (
        <MaterialIcons name="donut-small" size={24} color={appColors.white} />
      );
    } else {
      return (
        <MaterialIcons name="handyman" size={24} color={appColors.white} />
      );
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground>
        <SpaceComponent height={40} />
        <View style={{ marginHorizontal: 15 }}>
          <InputComponent
            divider
            affix={
              <AntDesign
                name="search1"
                size={24}
                style={{ fontWeight: "bold" }}
                color={appColors.primary}
              />
            }
            value={searchQuery}
            onChange={handleSearch}
          />
        </View>
        {/* filter data */}
        <SectionComponent>
          <RowComponents>
            <TagComponent
              styles={{ width: "22%" }}
              bgColor={appColors.primary}
              label="Price"
              onPress={handleSortByPrice}
              icon={
                <FontAwesome
                  name="unsorted"
                  size={24}
                  color={appColors.white}
                />
              }
            />
            <SpaceComponent width={10} />

            <TagComponent
              styles={{ width: "33%" }}
              bgColor={appColors.primary}
              label={
                isAutomatic === null
                  ? "Automatic"
                  : isAutomatic
                  ? "All Item"
                  : "Manual"
              }
              onPress={handleIsAutomatic}
              icon={renderAutomaticIcon()}
            />
          </RowComponents>
        </SectionComponent>

        <>
          {filteredData.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <LottieView
                autoPlay
                loop
                style={{
                  width: appInfo.sizes.WIDTH * 1,
                  height: appInfo.sizes.HEIGHT * 1,
                  backgroundColor: "transparent",
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../../assets/animations/no.json")}
              />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              data={filteredData}
              renderItem={({ item }) => {
                const isBookmarked = bookmarks.includes(item.id.toString());
                return (
                  <CardComponents
                    isShadow
                    onPress={() =>
                      navigation.navigate("DetailScreen", { item })
                    }
                  >
                    <RowComponents>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 120, height: 120 }}
                      />
                      <SpaceComponent width={5} />
                      <View style={{ flex: 1 }}>
                        <TextComponent text={item.name} size={17} />
                        <TextComponent
                          text={item.type}
                          size={15}
                          color={appColors.gray}
                        />
                        <SpaceComponent height={10} />

                        <TagComponent
                          icon={
                            <MaterialIcons
                              name="auto-mode"
                              size={10}
                              color="#fff"
                            />
                          }
                          styles={{ width: "38%" }}
                          textStyles={{ fontSize: 10 }}
                          bgColor="#333333"
                          label={`${item.automatic ? "Automatic" : "Manual"} `}
                          onPress={() => {}}
                        />
                        <SpaceComponent height={20} />
                        <TextComponent
                          styles={{ marginLeft: 10 }}
                          text={`${item.price} $`}
                          size={20}
                        />
                      </View>
                    </RowComponents>
                    <CircleComponent
                      color="#ffffff"
                      styles={{
                        borderWidth: 0.5,
                        borderColor: "#333",
                        zIndex: 1,
                        position: "absolute",
                        top: 100,
                        right: 10,
                      }}
                    >
                      <AntDesign
                        name="heart"
                        size={24}
                        color={isBookmarked ? "#eb3434" : "#1c1919"}
                      />
                    </CircleComponent>
                  </CardComponents>
                );
              }}
            />
          )}
        </>
      </ContainerComponent>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
