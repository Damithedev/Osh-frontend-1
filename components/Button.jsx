import { Text, TouchableOpacity } from 'react-native';

const MyButton = (props, content) => {
    const {style, ...others} = props;


  // if(fontsLoaded) console.log("font loaded")

  if(!fontsLoaded) return null;

  return (
        <TouchableOpacity className="h-8" {...others} >{content}</TouchableOpacity>
    //     <TextInput
    //     style={{fontFamily: "Urbanist", fontSize: 16}}
    //     {...others}
    // />
  );
}

export default MyButton