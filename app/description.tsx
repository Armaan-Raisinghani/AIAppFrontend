import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
// Entry Screen Component
const indexScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-400 items-center justify-center">
      {/* Outer Container */}
      <TouchableOpacity
        className="absolute top-10 left-5 bg-blue-800 py-2 px-4 rounded-full"
        onPress={() => {
          router.back();
        }}
      >
        <Text className="text-center text-white font-semibold">Back</Text>
      </TouchableOpacity>
      <View className="bg-white w-3/4 p-4 rounded-lg shadow-md">
        {/* Header Section */}
        <View>
          <Text className="text-black text-center text-lg font-bold">
            Instructions
          </Text>
        </View>
        <View>
          <Text className="text-black justify p-8 text-lg">
            1. Click on the 'Start' button. {"\n"}2. ⁠Start reading the text
            given in your mind. {"\n"}3. ⁠React to the text you read, as per
            what seems appropriate. {"\n"}4. ⁠Click on the ‘Stop’ button.
          </Text>
        </View>
        {/* Content Section */}
        <View className="bg-white w-10/12 mx-auto my--0 p-4 h-[10%]"></View>
        <TouchableOpacity
          onPress={() => {
            router.push("/record");
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-800 py-2 px-4 mt-6 rounded-full absolute bottom-10 self-center w-1/2"
          onPress={() => {
            router.push("/record");
          }}
        >
          <Text className="text-center text-white font-semibold">Enter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default indexScreen;
