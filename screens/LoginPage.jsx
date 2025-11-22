import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});

export default function Login({ navigation }) {
  const { control, handleSubmit, watch, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    try {
      const existingUser = await AsyncStorage.getItem("users");

      let users = existingUser ? JSON.parse(existingUser) : [];

      // Find the full user object
      const matchedUser = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (matchedUser) {
        // Store actual user object, not the login form data
        await AsyncStorage.setItem("currentUser", JSON.stringify(matchedUser));

        setTimeout(() => {
          setLoading(false);
          navigation.navigate("Home");
        }, 2000);
      } else {
        setLoading(false);
        alert("No user found with this email. Please register first");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Failed to login user");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-20">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-gray-900 mb-3">
            Login
          </Text>
          <Text className="text-base text-gray-500">
            Enter your details to login to your account
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Email address</Text>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 bg-gray-50"
                value={value}
                onChangeText={onChange}
                placeholder="abc@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>}
        </View>

        <View className="mb-8">
          <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 bg-gray-50"
                value={value}
                onChangeText={onChange}
                placeholder="At least 6 characters"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>}
        </View>

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className={` rounded-xl py-4 mt-4 ${loading ? "bg-rose-200" : "bg-rose-500"}`}
          disabled={loading}
        >
          <Text className={`text-white font-semibold text-center text-lg ${loading ? "opacity-50" : ""}`}>{loading ? "Loading..." : "Log in"}</Text>
        </Pressable>
      </View>
    </View>
  );
}