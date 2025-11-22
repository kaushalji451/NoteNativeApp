import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import "./global.css";

import Welcome from "./screens/WelcomePage.jsx";
import Login from "./screens/LoginPage.jsx";
import Register from "./screens/RegisterPage.jsx";
import HomePage from "./screens/HomePage.jsx";
import CreatePage from "./screens/CreatePage.jsx";
import EditPage from "./screens/EditPage.jsx";
import SwitchUser from "./screens/SwitchUser.jsx";

import isLoggedIn from "./utils/isLoggedIn.js";

const Stack = createNativeStackNavigator();

export default function App() {
    const [initialRoute, setInitialRoute] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const loggedIn = await isLoggedIn();
                setInitialRoute(loggedIn ? 'Home' : 'Welcome');
            } catch (err) {
                console.error('Error checking login:', err);
                setInitialRoute('Welcome');
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [])

    if (loading || !initialRoute) {
        // Simple splash while checking token
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
            >
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ title: 'Welcome page', headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login page', headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ title: 'Register page', headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{ title: 'Home page', headerShown: false }}
                />
                <Stack.Screen
                    name="AddNewNote"
                    component={CreatePage}
                    options={{ title: 'Create page', headerShown: false }}
                />
                <Stack.Screen
                    name="EditNote"
                    component={EditPage}
                    options={{ title: 'Edit page', headerShown: false }}
                />
                <Stack.Screen
                    name="SwitchUser"
                    component={SwitchUser}
                    options={{ title: 'SwitchUser page', headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}