
import React from 'react'
import { View, Pressable } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Options = ({ navigation }) => {

    let handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem("currentUser");
            navigation.replace("Welcome");
        } catch (error) {
            alert("Some error Occured");
            console.log(error);
        }
    }

    return (
        <View className="flex flex-row space-x-4 gap-4">

            {/* Add New Note */}
            <Pressable
                onPress={() => navigation.navigate('AddNewNote')}
                className="bg-blue-600 p-2 rounded-full"
            >
                <Ionicons name="add" size={22} color="white" />
            </Pressable>

            {/* Switch User */}
            <Pressable
                onPress={() => navigation.navigate('SwitchUser')}
                className="bg-yellow-500 p-2 rounded-full"
            >
                <Ionicons name="people" size={22} color="white" />
            </Pressable>

            {/* Logout */}
            <Pressable
                onPress={handleLogOut}
                className="bg-red-600 p-2 rounded-full"
            >
                <Ionicons name="log-out" size={22} color="white" />
            </Pressable>

        </View>
    )
}

export default Options
