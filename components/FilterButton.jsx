
import React from 'react'
import { View, Pressable, Text } from 'react-native'

const FilterButton = ({sortType,setSortType}) => {
    return (
        <View className="flex flex-row justify-around px-3 py-3 bg-gray-100">

            <Pressable onPress={() => setSortType("az")}>
                <Text className={`font-semibold ${sortType === "az" ? "text-blue-600" : "text-black"}`}>
                    A -&gt; Z
                </Text>
            </Pressable>

            <Pressable onPress={() => setSortType("za")}>
                <Text className={`font-semibold ${sortType === "za" ? "text-blue-600" : "text-black"}`}>
                    Z -&gt; A
                </Text>
            </Pressable>

            <Pressable onPress={() => setSortType("newest")}>
                <Text className={`font-semibold ${sortType === "newest" ? "text-blue-600" : "text-black"}`}>
                    Newest -&gt;
                </Text>
            </Pressable>

            <Pressable onPress={() => setSortType("oldest")}>
                <Text className={`font-semibold ${sortType === "oldest" ? "text-blue-600" : "text-black"}`}>
                    Oldest -&gt;
                </Text>
            </Pressable>

        </View>
    )
}

export default FilterButton
