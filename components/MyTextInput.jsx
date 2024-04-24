import { StyleSheet, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
const MyTextInput = (props) => {
  const { style, ...others } = props;

  const [fontsLoaded] = useFonts({
    Proxima_Nova: require("../assets/fonts/Proxima/Proxima_Nova.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <TextInput
      style={[{ fontFamily: "Proxima_Nova", fontSize: 16 }, style]}
      {...others}
    />
  );
};

export default MyTextInput;
