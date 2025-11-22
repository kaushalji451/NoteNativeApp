import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import sortNotes from '../utils/sortNotes';
import FilterButton from '../components/FilterButton';
import Options from '../components/Options';

export default function HomePage({ navigation }) {
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState("az");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getData = async () => {
            let currentUser = await AsyncStorage.getItem("currentUser");
            console.log(currentUser);
            if (!currentUser) {
                console.log("not user found");
                return;
            }
            currentUser = JSON.parse(currentUser);
            let data = await AsyncStorage.getItem(`user_notes_${currentUser.id}`);
            data = await JSON.parse(data);
            console.log("user id", `user_notes_${currentUser.id}`);
            console.log(data);
            setData(data);
        }
        getData();
    }, []);

    const handleDelete = async (noteId) => {
        try {
            let currentUser = await AsyncStorage.getItem("currentUser");

            if (!currentUser) {
                console.log("No user found");
                return;
            }
            currentUser = JSON.parse(currentUser);

            // Load user's notes
            let data = await AsyncStorage.getItem(`user_notes_${currentUser.id}`);
            let notes = data ? JSON.parse(data) : [];

            // Filter out the note to delete
            const updatedNotes = notes.filter((note) => note.noteId !== noteId);

            // Save updated notes
            await AsyncStorage.setItem(
                `user_notes_${currentUser.id}`,
                JSON.stringify(updatedNotes)
            );
            setData(updatedNotes);
            console.log("Note deleted:", noteId);
        } catch (error) {
            console.log("Failed to delete note:", error);
        }
    };

    const filteredNotes = sortNotes(data, sortType).filter(note => {
        const q = searchQuery.toLowerCase();
        return (
            note.title.toLowerCase().includes(q) ||
            note.description.toLowerCase().includes(q)
        );
    });
    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar
                translucent
            />

            {/* Fixed Navbar */}
            <View className="bg-rose-400 py-4 px-4 flex flex-row justify-between items-center">

                {/* App Name */}
                <Text className="text-xl font-bold text-white">Note App</Text>

                {/* Right Buttons */}

                <Options navigation={navigation} />
            </View>

            {/* Scrollable Content */}
            <ScrollView className="flex-1 bg-white">
                {/* search bar */}
                <View className="px-4 py-2 bg-white">
                    <View className="flex flex-row items-center bg-gray-200 rounded-full px-4 py-2">
                        <Ionicons name="search" size={20} color="gray" />
                        <TextInput
                            placeholder="Search notes..."
                            className="ml-2 flex-1 text-gray-800"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <Pressable onPress={() => setSearchQuery("")}>
                                <Ionicons name="close-circle" size={20} color="gray" />
                            </Pressable>
                        )}
                    </View>
                </View>

                <FilterButton sortType={sortType} setSortType={setSortType} />
                <View>
                    {filteredNotes ? filteredNotes.map((item, idx) => {
                        return (
                            <View key={idx} className="bg-gray-100 p-4 m-2 rounded-lg shadow">
                                <Image
                                    source={{ uri: item.image }}
                                    className="w-full h-48 mb-4 rounded-lg"
                                />
                                <Text className="text-lg font-semibold mb-2">{item.title}</Text>
                                <Text className="text-gray-700">{item.description}</Text>
                                <View className="flex flex-row mt-4 justify-between space-x-4">
                                    <Pressable
                                        onPress={() => { navigation.navigate('EditNote', { item: item }) }}
                                        className="bg-green-500 w-1/3 py-2 px-2 rounded-md">
                                        <Text className="text-white text-center font-semibold">
                                            Edit
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => handleDelete(item.noteId)}
                                        className="bg-red-500 w-1/3 py-2 px-2 rounded-md">
                                        <Text className="text-white text-center font-semibold">
                                            Delete
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                        : (

                            <View className="items-center mt-10">
                                <Text className="text-gray-500 text-lg">No notes found</Text>
                            </View>

                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}