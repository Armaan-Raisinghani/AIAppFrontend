import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "react-native-heroicons/outline";
import "../global.css";
export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [active, setActive] = useState(false);
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [time, setTime] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);
  useEffect(() => {
    console.log(active);
    if (active) {
      if (camera) {
        setTime(
          setInterval(() => {
            camera.takePictureAsync().then((img) => {
              console.log(img);
            });
          }, 1000)
        );
      }
    } else {
      clearInterval(time);
      setTime(null);
    }
  }, [active, camera]);
  useEffect(() => {
    console.log(time);
  }, [time]);
  function handlePress() {
    const t = !active;
    setActive(!active);
    if (t) {
      console.log("Camera active");
    } else {
      console.log("Camera inactive");
    }
  }
  return (
    <ScrollView
      className={
        "bg-primary p-10 rounded-3xl m-10 flex-auto flex-col content-center gap-10 box-content " +
        (active ? "border-red-600 border-solid border-8 p-8" : "")
      }
    >
      {active && (
        <CameraView facing="front" ref={(ref) => setCamera(ref)}></CameraView>
      )}
      {!permission && (
        <View>
          <Text>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      )}
      {/* Main Content Container */}
      <View className="bg-white rounded-3xl h-4/5">
        <ScrollView>
          <Text className="text-2xl p-10 m-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
            {"\n"} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
          </Text>
        </ScrollView>
      </View>
      {/* Camera Button */}
      <TouchableOpacity
        className="bg-white rounded-full items-center m-auto p-10 h-1/6"
        onPress={handlePress}
      >
        {active ? (
          <VideoCameraIcon className="fill-primary" color="white" size={120} />
        ) : (
          <VideoCameraSlashIcon
            className="fill-primary"
            color="white"
            size={120}
          />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
