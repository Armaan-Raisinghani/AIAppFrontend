import { useEffect, useState, useRef } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import "../global.css";
import axios from "axios";
import { router } from "expo-router";
import data from "../assets/emoz";
import React from "react";

type EmotionData = {
  angry: String[];
  disgust: String[];
  fear: String[];
  neutral: String[];
  sad: String[];
  surprise: String[];
  happy: String[];
};
const Authorization = "test123";
const api = axios.create({
  baseURL: "http://34.131.3.188:8000/",
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

  const randClass = Object.keys(data)[
    Math.floor(Math.random() * Object.keys(data).length)
  ] as keyof EmotionData;
  const text =
    data[randClass][Math.floor(Math.random() * data[randClass].length)];
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
  useEffect(() => {
    if (emotion) {
      router.push({
        pathname: "/result",
        params: {
          predicted: emotion,
          correct: randClass,
          confidence,
        },
      });
    }
  }, [emotion]);
  return (
    <View
      className={
        "bg-blue-400 h-full flex align-middle items-center p-2 " +
        (active ? "border-red-600 border-solid border-8 p-0 " : "")
      }
    >
      <TouchableOpacity
        className="absolute top-10 left-5 bg-blue-800 py-2 px-4 rounded-full"
        onPress={() => {
          router.back();
        }}
      >
        <Text className="text-center text-white font-semibold">Back</Text>
      </TouchableOpacity>
      <ScrollView
        className={
          "p-10 rounded-3xl m-10 flex flex-col  gap-10 box-content w-3/5  "
        }
      >
        {active && <CameraView facing="front" ref={setCamera}></CameraView>}
        {!permission && (
          <View>
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        )}
        {/* Main Content Container */}
        <View className="bg-white rounded-3xl">
          <View>
            <Text className="text-xl font-bold p-5 m-auto ">
              Read the following text:
            </Text>
            <Text className="p-8 pt-0 m-auto ">{text}</Text>
          </View>
        </View>
        {/* Camera Button */}
        <View className="flex align-middle flex-row justify-center ">
          <TouchableOpacity
            className="m-10 p-5 bg-blue-800 "
            disabled={active}
            onPress={handlePress}
          >
            <Text className={"text-3xl " + (!active ? "text-white" : "")}>
              Start
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="m-10 p-5 bg-blue-800 "
            disabled={!active}
            onPress={handlePress}
          >
            <Text className={"text-3xl " + (active ? "text-white" : "")}>
              Stop
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
