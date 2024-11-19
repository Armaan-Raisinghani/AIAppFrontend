import { router, useNavigation } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// Entry Screen Component
const descriptionScreen = () => {
  return (
    <View className="flex-1 p-6  bg-white">
      {/* Main Container */}
      <View className="w-full items-center mt-8 bg-teal-800 p-4 ">
        <Text className="text-2xl font-bold text-white">Instruction</Text>
      </View>
      <View className="w-full items-center my-8 bg-teal-800 p-4">
        <Text className="text-lg text-white">Instruction</Text>
      </View>
      <TouchableOpacity>
        <Text className="text-lg text-white">Start</Text>
      </TouchableOpacity>
    </View>
  );
};

// Export NativeWind Stylesheet
export default descriptionScreen;
