import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// Entry Screen Component
const index = () => {
  return (
    <View className="flex-1 bg-white justify-between items-center p-6">
      {/* Header Section */}
      <View className="w-full items-center mt-8 bg-teal-800 p-4 ">
        <Text className="text-2xl font-bold text-white">Welcome</Text>
      </View>

      {/* Project Name Section */}
      <View className="w-full items-center mt-10">
        <Text className="text-lg bg-teal-800 text-white py-3 px-6 w-full text-center">
          Descriptive Project Name
        </Text>
      </View>

      {/* Enter Button */}
      <TouchableOpacity
        className="bg-teal-700 py-3 px-12 rounded-full mt-auto mb-auto"
        onPress={() => {
          router.push("description");
        }}
      >
        <Text className="text-white text-lg font-semibold">Enter</Text>
      </TouchableOpacity>

      {/* Footer Section */}
      <View className="flex-row justify-between w-full mt-auto pb-8">
        <TouchableOpacity className="bg-teal-700 py-2 px-6 rounded-full">
          <Text className="text-white text-sm font-medium">CTLC Lab</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-teal-700 py-2 px-6 rounded-full">
          <Text className="text-white text-sm font-medium">HCI Lab</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Section */}
      <View className="items-center">
        <Text className="text-teal-800 font-bold text-lg">
          PLAKSHA UNIVERSITY
        </Text>
      </View>
    </View>
  );
};

// Export NativeWind Stylesheet
export default index;
