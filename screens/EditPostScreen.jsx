import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Entypo, EvilIcons } from '@expo/vector-icons';

import MyText from '../components/MyText';

const EditPostScreen = ({navigation}) => {

    return (
        <SafeAreaView className="flex-1 justify-center items-center w-screen bg-[#3B7CDD]">
            <StatusBar style="light" />
            <MyText content="EditPost Screen" className="text-white text-lg" />
        </SafeAreaView>        
    );
}

export default EditPostScreen;