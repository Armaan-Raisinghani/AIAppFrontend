import { useEffect, useState, useRef } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "react-native-heroicons/outline";
import "../global.css";
import axios from "axios";

const Authorization = "test123";
const api = axios.create({
  baseURL: "http://10.1.57.64:8000",
  headers: {
    Authorization: Authorization,
  },
});

export default function recordScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [active, setActive] = useState<boolean>(false);
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [time, setTime] = useState<NodeJS.Timeout | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    if (active) {
      if (camera) {
        setTime(
          setInterval(() => {
            if (!sessionIdRef.current) {
              return;
            }

            camera.takePictureAsync({ base64: true }).then((img) => {
              if (!img || !img.base64) {
                return;
              }

              const base64img = `data:image/jpeg;base64,${img.base64}`;

              api
                .post(
                  "/process",
                  {
                    imageData: base64img,
                  },
                  {
                    headers: {
                      Authorization: Authorization,
                      "Content-Type": "application/json",
                      SessionId: sessionIdRef.current,
                    },
                  }
                )
                .catch((err) => {
                  console.error(err.response?.data.detail);
                });
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
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  async function handlePress() {
    const t = !active;
    setActive(!active);
    if (t) {
      console.log("Camera active");
      setEmotion(null);
      setConfidence(null);

      try {
        const response = await api.put(
          "/start",
          {},
          {
            headers: {
              Authorization: Authorization,
            },
          }
        );
        setSessionId(response.data.SessionId);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Camera inactive");
      clearInterval(time);

      if (!sessionId) {
        return;
      }

      try {
        const response = await api.delete("/stop", {
          headers: {
            Authorization: Authorization,
            SessionId: sessionId,
          },
        });
        setEmotion(response.data.emotion);
        setConfidence(response.data.confidence);
      } catch (err) {
        console.error(err);
      }

      setSessionId(null);
    }
  }

  return (
    <ScrollView
      className={
        "bg-primary p-10 rounded-3xl m-10 flex-auto flex-col content-center gap-10 box-content " +
        (active ? "border-red-600 border-solid border-8 p-8" : "")
      }
    >
      {active && <CameraView facing="front" ref={setCamera}></CameraView>}
      {!permission && (
        <View>
          <Text>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      )}
      {emotion && confidence && (
        <View>
          <Text>
            Emotion: {emotion}
            {"\n"} Confidence: {confidence}
          </Text>
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
