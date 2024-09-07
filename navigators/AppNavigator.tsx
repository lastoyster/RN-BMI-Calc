import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BmiResultScreen from "../screens/BmiResultScreen";
import BmiCalculatorScreen from "../screens/BmiCalculatorScreen";
import { ScreenName } from "../types/ScreenName";

const AppStack = createNativeStackNavigator();

const screenOptions = {
    headerStyle: {
        backgroundColor: "#0A0C21",
    },
    headerTitleStyle: {
        color: 'white',
    },
    title: 'BMI CALCULATOR',
};

const AppNavigator: React.FC = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen 
                name={ScreenName.BMI_CALCULATOR}
                component={BmiCalculatorScreen}
                options={screenOptions}
            />
            <AppStack.Screen 
                name={ScreenName.BMI_RESULT}
                component={BmiResultScreen}
                options={screenOptions}
            />
        </AppStack.Navigator>
    );
};

export default AppNavigator;
