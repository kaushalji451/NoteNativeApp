import AsyncStorage from "@react-native-async-storage/async-storage"

const isLoggedIn = async () => {
    try {
        let user = await AsyncStorage.getItem("currentUser");
        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
}

export default isLoggedIn;