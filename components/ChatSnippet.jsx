import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

const ChatSnippet = ({ content, myStyle }) => {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    Urbanist: require("../assets/fonts/Urbanist/static/Urbanist-Regular.ttf"),
    Proxima_Nova: require("../assets/fonts/Proxima/Proxima_Nova.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Text
      style={{ fontFamily: "Proxima_Nova" }}
      numberOfLines={1}
      className={myStyle}
    >
      {content}
    </Text>
  );
};

export default ChatSnippet;
