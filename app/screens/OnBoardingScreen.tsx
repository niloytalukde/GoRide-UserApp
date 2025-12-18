import React, { useRef } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { router } from "expo-router";

export default function OnBoardingScreen() {
  const videoRef = useRef<Video>(null);

  const handlePlaybackStatus = (status: any) => {
    if (status.didJustFinish) {
      router.replace("/(routes)/Login"); 
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Video
        ref={videoRef}
        source={require("../assets/vedio/OTPCAB.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        useNativeControls={false}
        isLooping={false}                
        onPlaybackStatusUpdate={handlePlaybackStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
