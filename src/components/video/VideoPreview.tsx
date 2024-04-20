import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { startVideoScreen } from "vdocipher-rn-bridge";
import { VdoPlayerView } from "vdocipher-rn-bridge";

import axios from "axios";
type Props = {
  videoUrl: string;
  title?: string;
};

const VideoPreview = (props: Props) => {
  const { videoUrl, title } = props;
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  useEffect(() => {
    axios
      .post("http://192.168.1.9:8888/api/v1/course/generate-url", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data.data);
      });
  }, [videoUrl]);
  const embedInfo = {
    otp: videoData.otp,
    playbackInfo: videoData.playbackInfo,
  };
  console.log("helo", videoData);
  startVideoScreen(
    { embedInfo: { otp: "20160313versASE323Lv4mJU50ycCvBtfVqgHAksVntxfdjIDaeYbGOaK4TkZSMj", playbackInfo: "eyJ2aWRlb0lkIjoiMjg1ZjBkODE2OWYxNDI0NTkwY2U5MTlhMDNhNjVjOWIifQ==" } },
    true
  );
  return <></>;
};

export default VideoPreview;

const styles = StyleSheet.create({});
