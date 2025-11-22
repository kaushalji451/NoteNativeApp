import 'react-native-get-random-values';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

export default function Register({ navigation }) {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const existingUser = await AsyncStorage.getItem("users");
      let users = existingUser ? JSON.parse(existingUser) : [];

      const userExists = users.some((user) => user.email === data.email);

      if (userExists) {
        setLoading(false);
        alert("User with this email already exists");
        return;
      }

      // Generate UUID for this user
      const newUser = {
        id: uuidv4(),
        email: data.email,
        password: data.password
      };

      console.log(newUser);
      users.push(newUser);

      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));

      setTimeout(() => {
        setLoading(false);
        navigation.navigate("Home");
      }, 1500);

    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Failed to register user");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-20">

        <View className="mb-12">
          <Text className="text-4xl font-bold text-gray-900 mb-3">
            Create account
          </Text>
          <Text className="text-base text-gray-500">
            Enter your details to get started
          </Text>
        </View>

        {/* Email */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Email address</Text>

          <Controller
            control={control}
            name="email"
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

          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
          )}
        </View>

        {/* Password */}
        <View className="mb-8">
          <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>

          <Controller
            control={control}
            name="password"
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

          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
          )}
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className={`rounded-xl py-4 mt-4 ${loading ? "bg-rose-300" : "bg-rose-500"}`}
          disabled={loading}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {loading ? "Loading..." : "Sign up"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
