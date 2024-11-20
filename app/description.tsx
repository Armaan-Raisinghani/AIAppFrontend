import { router, useNavigation } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
// Entry Screen Component
const descriptionScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white-200 items-center justify-center">
      {/* Outer Container */}
      <View className="bg-white w-11/12 h-5/6 rounded-lg shadow-lg">
        {/* Header Section */}
        <View className="bg-teal-700 w-10/12 mx-auto mt-8 p-4">
          <Text className="text-white text-center text-lg font-bold">
            Instructions
          </Text>
        </View>
        {/* Content Section */}
        <View className="bg-teal-700 w-5/6 mx-auto my-4 p-4 h-[60%]"></View>
        <TouchableOpacity
          onPress={() => {
            router.push("record");
          }}
        >
          <View className="bg-teal-700 w-[40%] mx-auto my-8 p-4 rounded-full">
            <Text className="text-white text-center text-lg font-bold">
              Enter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Export NativeWind Stylesheet
export default descriptionScreen;
