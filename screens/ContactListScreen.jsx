import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import MyText from "../components/MyText";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ContactListScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data[0];
          const allContacts = data;
          setContacts(allContacts);
          console.log(contact);
        }
      }
    })();
  }, []);

  const renderFollow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => alert(`contact with id ${item.id}`)}
        className="flex flex-row p-1 my-2"
      >
        <View className="flex justify-center items-center h-10 w-10 rounded-full bg-blue-500 mr-2"></View>
        <MyText content={item?.name} myStyle={"text-lg font-bold"} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <MyText myStyle={{ color: "#05375a" }} content={"No Update Yet!"} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white">
      <View className="flex flex-row justify-between items-center bg-blue-800 w-full h-[100px] pt-12">
        <View className="flex flex-row justify-center items-center">
          <TouchableOpacity
            className=" mx-2"
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View>
            <MyText
              content={"Select contact"}
              myStyle={"text-white font-bold"}
            />
            <MyText
              content={`${contacts.length} contacts`}
              myStyle={"text-white"}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between w-[60px]">
          <TouchableOpacity
            // onPress={() => setMySearch(!mySearch)}
            activeOpacity={0.8}
            className="p-1"
          >
            <AntDesign name="search1" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} className="p-1">
            <Feather name="more-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-center items-center p-3">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contacts}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderFollow}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
