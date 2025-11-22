import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageUpload from '../components/ImageUpload';

import updateNoteForUser from '../utils/updateNoteForUser';


const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    image: yup.string().required('Image is required'),
});

const EditPage = ({ route, navigation }) => {
    const { item } = route.params;
    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)});

    useEffect(() => {
        if (item) {
            console.log("this is item", item);
            reset({
                title: item.title,
                description: item.description,
                image: item.image,
            });
            setSelectedImage(item.image);
        }
    }, [])


    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);

        try {
            console.log('Note created:', data);
            data = { ...data, noteId: item.noteId };
            await updateNoteForUser(data);
            setTimeout(() => {
                setLoading(false);
                alert("Note Saved Successfully");
                navigation.navigate('Home')
            }, 2000);
        } catch (error) {
            console.error('Error creating note:', error);
            setLoading(false);
        }
    };

    const handleImageSelect = (imageUri) => {
        console.log('Selected image URI:', imageUri);
        setSelectedImage(imageUri);
        setValue('image', imageUri, { shouldValidate: true });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar
                translucent
            />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-6 pt-8">
                    {/* Header */}
                    <View className="mb-12">
                        <Text className="text-4xl font-bold text-gray-900 mb-3">
                            Edit your Note
                        </Text>
                        <Text className="text-base text-gray-500">
                            Change the details for edit note
                        </Text>
                    </View>

                    {/* Title Field */}
                    <View className="mb-6">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Title</Text>
                        <Controller
                            control={control}
                            name="title"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 bg-gray-50"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter note title"
                                    placeholderTextColor="#9CA3AF"
                                    autoCapitalize="words"
                                />
                            )}
                        />
                        {errors.title && (
                            <Text className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </Text>
                        )}
                    </View>

                    {/* Description Field */}
                    <View className="mb-8">
                        <Text className="text-sm font-medium text-gray-700 mb-2">Description</Text>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 bg-gray-50"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Enter note description"
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    style={{ minHeight: 100 }}
                                />
                            )}
                        />
                        {errors.description && (
                            <Text className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </Text>
                        )}
                    </View>

                    {/* Image Upload Component */}
                    <ImageUpload
                        onImageSelect={handleImageSelect}
                        currentImage={selectedImage}
                    />
                    {errors.image && (
                        <Text className="text-red-500 text-sm mt-1 mb-4">
                            {errors.image.message}
                        </Text>
                    )}

                    {/* Submit Button */}
                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className={`rounded-xl py-4 mt-4 ${loading ? "bg-rose-300" : "bg-rose-500"}`}
                        disabled={loading}
                    >
                        <Text className="text-white font-semibold text-center text-lg">
                            {loading ? "Updateing..." : "Update Note"}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditPage;