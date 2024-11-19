import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="description" />
      <Stack.Screen name="record" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
