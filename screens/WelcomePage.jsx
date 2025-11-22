import React from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import WelcomeImage from '../assets/images/Welcomimg1.jpg';

export default function Welcome({ navigation }) {
  return (
    <ImageBackground
      source={WelcomeImage}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Gradient overlay for better text visibility */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        className="flex-1"
      >
        <SafeAreaView className="min-h-full flex flex-col justify-between p-6">
          {/* Header Section */}
          <View className="pt-8">
            <Text className="text-center text-5xl font-bold text-white tracking-tight">
              NoteApp
            </Text>
            <Text className="text-center text-xl mt-3 font-semibold text-rose-400">
              To Make Your Notes Beautiful
            </Text>
          </View>

          {/* Bottom Section */}
          <View className="mb-8">
            <Text className="text-5xl font-bold text-center mb-10 text-white leading-tight px-4">
              Perfect place to store your notes securely.
            </Text>
            
            <View className="space-y-3">
              {/* Create Account Button */}
              <Pressable 
                className="bg-rose-500 rounded-full p-5 mb-3 items-center shadow-lg active:bg-rose-600"
                onPress={() => navigation.navigate('Register')}
              >
                <Text className="font-bold text-white text-lg">Create an account</Text>
              </Pressable>

              {/* Sign In Button */}
              <Pressable 
                className="bg-white rounded-full p-5 mb-3 items-center shadow-lg active:bg-gray-50"
                onPress={() => navigation.navigate('Login')}
              >
                <Text className="font-bold text-gray-900 text-lg">I have an account</Text>
              </Pressable>
            </View>

            {/* Terms Text */}
            <Text className="text-center text-white text-xs mt-6 mx-6 leading-5 opacity-80">
              By signing up, you agree to our{' '}
              <Text className="font-semibold underline">Terms & Conditions</Text>
              {' '}and{' '}
              <Text className="font-semibold underline">Privacy Policy</Text>.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
