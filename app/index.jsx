import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>MarieKat</Text>
      <StatusBar style="auto" />
      <Link href="/(auth)/log-in" style={{ color: 'orange' }}>Login</Link>
      <Link href="/(auth)/sign-up" style={{ color: 'orange' }}>Signup</Link>
      <Link href="/(auth)/personalprofile-feature" style={{ color: 'orange'}}>Profile</Link>
      <Link href="/(auth)/petprofile-feature" style={{ color: 'orange'}}>Pet profile</Link>
      <Link href="/(pages)/home" style={{ color: 'blue'}}>Profile</Link>
    </View>
  );
}
