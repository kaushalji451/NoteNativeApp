import { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system/legacy";
import { Ionicons } from '@expo/vector-icons';

const ImageUpload = ({ onImageSelect, currentImage }) => {
    const [image, setImage] = useState(currentImage || '');

    useEffect(() => {
        setImage(currentImage);
    }, [currentImage]);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please allow access to your photos.');
            return false;
        }
        return true;
    };

    // Save image permanently to local storage
    const saveToLocalStorage = async (uri) => {
        try {
            const fileName = uri.split('/').pop();
            const newPath = FileSystem.documentDirectory + fileName;

            await FileSystem.copyAsync({
                from: uri,
                to: newPath
            });

            return newPath; // return saved file path
        } catch (error) {
            console.log("File save error:", error);
            Alert.alert("Error", "Failed to save image locally.");
            return null;
        }
    };

    const pickImage = async () => {
        const permission = await requestPermissions();
        if (!permission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const localUri = await saveToLocalStorage(result.assets[0].uri);

                if (localUri) {
                    setImage(localUri);
                    onImageSelect(localUri);
                }
            }
        } catch (error) {
            console.log("Error picking image:", error);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission required", "Camera access is required.");
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const localUri = await saveToLocalStorage(result.assets[0].uri);

                if (localUri) {
                    setImage(localUri);
                    onImageSelect(localUri);
                }
            }
        } catch (error) {
            console.log("Error taking photo:", error);
        }
    };

    const removeImage = () => {
        setImage('');
        onImageSelect('');
    };

    return (
        <View className="mb-8">
            <View className="items-center mb-6">
                {image ? (
                    <View className="relative">
                        <Image source={{ uri: image }} className="w-64 h-80 rounded-2xl" />

                        <Pressable
                            onPress={removeImage}
                            className="absolute top-3 right-3 bg-red-500 rounded-full p-2"
                        >
                            <Ionicons name="close" size={24} color="white" />
                        </Pressable>
                    </View>
                ) : (
                    <View className="w-64 h-80 bg-gray-100 rounded-2xl items-center justify-center border-2 border-dashed border-gray-300">
                        <Ionicons name="camera" size={64} color="#9CA3AF" />
                        <Text className="text-gray-500 mt-4">No photo selected</Text>
                    </View>
                )}
            </View>

            <View className="space-y-4 gap-4">
                <Pressable
                    onPress={pickImage}
                    className="bg-rose-500 py-4 rounded-full flex-row items-center justify-center"
                >
                    <Ionicons name="images" size={24} color="white" />
                    <Text className="text-white font-semibold text-lg ml-2">
                        Choose from Gallery
                    </Text>
                </Pressable>

                <Pressable
                    onPress={takePhoto}
                    className="bg-white border-2 border-rose-500 py-4 rounded-full flex-row items-center justify-center"
                >
                    <Ionicons name="camera" size={24} color="#F43F5E" />
                    <Text className="text-rose-500 font-semibold text-lg ml-2">
                        Take a Photo
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ImageUpload;
