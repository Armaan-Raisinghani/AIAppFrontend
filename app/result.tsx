import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const WelcomeScreen = () => {
  const searchParams = useLocalSearchParams();
  const predicted = searchParams.predicted as string;
  const correct = searchParams.correct as string;
  const confidence = Number(searchParams.confidence);
  const roundedConfidence = confidence.toFixed(2);

  return (
    <View className="flex-1 bg-blue-400 justify-center items-center">
      {/* Main Card */}
      <View className="bg-white w-3/4 max-w-lg p-6 h-96 rounded-lg shadow-md">
        {/* Title */}
        <Text className="text-3xl font-bold text-center">Result</Text>

        {/* ImOcean */}
        <View className="mt-4 mb-2">
          <Text className="text-center font-medium text-gray-500">ImOcean</Text>
          <View className="border-b border-gray-300 mt-1 mx-12"></View>
        </View>

        {/* Project Description */}
        <Text className="text-center text-gray-600 mt-4 text-lg">
          Expression predicted by text: {predicted}
          {"\n"}
          Correct expression: {correct}
          {"\n"}
          AI model confidence: {roundedConfidence}
        </Text>

        {/* Enter Button */}
        <TouchableOpacity
          className="bg-blue-800 py-2 px-4 mt-6 rounded-full absolute bottom-10 self-center w-1/2"
          onPress={() => {
            router.dismissAll();
          }}
        >
          <Text className="text-center text-white font-semibold">Restart</Text>
        </TouchableOpacity>
      </View>
      {/* Plaksha Logo */}
      <Image
        source={require("../assets/images/logo-white.png")}
        style={{
          width: 250,
          height: 125,
        }}
        className="absolute bottom-20"
      />

      {/* Bottom Buttons */}
      <View className="absolute bottom-10 flex-row gap-4 ">
        {/* HTI Lab Button */}
        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-md shadow-md">
          <Text className="text-white font-semibold">HTI LAB</Text>
        </TouchableOpacity>

        {/* CTLC Lab Button */}
        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-md shadow-md">
          <Text className="text-white font-semibold">CTLC LAB</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
