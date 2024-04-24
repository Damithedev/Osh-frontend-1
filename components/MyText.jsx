import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

const MyText = ({ content, myStyle }) => {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
    Urbanist: require("../assets/fonts/Urbanist/static/Urbanist-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Text style={{ fontFamily: "Inter" }} className={myStyle}>
      {content}
    </Text>
  );
};

export default MyText;
