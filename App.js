import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import ModifyGrade from "./ModifyGrade";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ModifyGrade" component={ModifyGrade} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
