import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import GenderButtonSelect from '../components/GenderButtonSelect';
import SliderSelect from '../components/SliderSelect';
import CounterSelect from '../components/CounterSelect';
import { ScreenName } from '../types/ScreenName';

const BmiCalculatorScreen: React.FC<NativeStackScreenProps<ParamListBase>> = ({ navigation }) => {

    // Type for formState
    interface FormState {
        gender?: 'male' | 'female';
        height?: number;
        weight?: number;
        age?: number;
    }

    // State
    const [formState, setFormState] = React.useState<FormState>({});

    // Helpers
    const isButtonDisabled = () => {
        return !(formState.gender && formState.age && formState.height && formState.weight);
    };

    // Styles
    const btnStyle: StyleProp<ViewStyle> = {
        backgroundColor: isButtonDisabled() ? "#D3D3D3" : "#D83456",
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
    };
    const btnTextStyle: StyleProp<TextStyle> = {
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase',
    };

    // Handlers
    const handleChange = (key: keyof FormState, value: number) => {
        setFormState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handlePress = (value: 'male' | 'female') => {
        setFormState((prevState) => ({
            ...prevState,
            gender: prevState.gender === value ? undefined : value,
        }));
    };

    const calculateBmi = () => {
        const { weight, height } = formState;
        if (weight && height) {
            const heightMeters = height / 100;
            const bmiResult = (weight / (heightMeters * heightMeters)).toFixed(2);
            navigation.navigate(ScreenName.BMI_RESULT, { bmi: Number.parseFloat(bmiResult) });
        }
    };

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.inner}>

                    {/* Gender Button Group */}
                    <View style={styles.row}>
                        <GenderButtonSelect 
                            onPress={() => handlePress('male')}
                            selected={formState.gender === 'male'}
                        />
                        <GenderButtonSelect 
                            gender="female" 
                            onPress={() => handlePress('female')}
                            selected={formState.gender === 'female'}
                        />
                    </View>

                    {/* Height Slider */}
                    <View style={styles.sliderContainer}>
                        <SliderSelect onValueChange={(value) => handleChange('height', value)} />
                    </View>

                    {/* Weight and Age Counters */}
                    <View style={styles.row}>
                        <CounterSelect
                            label="weight"
                            suffix="kg"
                            defaultValue={60}
                            onValueChange={(value) => handleChange('weight', value)}
                        />
                        <CounterSelect 
                            label="age"
                            onValueChange={(value) => handleChange('age', value)}
                        />
                    </View>

                    {/* Calculate Button */}
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={btnStyle}
                            disabled={isButtonDisabled()}
                            onPress={calculateBmi}
                        >
                            <Text style={btnTextStyle}>Calculate your BMI</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </MainLayout>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#080A1C",
        flex: 1,
        padding: '3%',
    },
    inner: {
        backgroundColor: "#0A0C21",
        flex: 1,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    sliderContainer: {
        marginVertical: '5%',
    },
    btnContainer: {
        marginTop: '10%',
    },
});

export default BmiCalculatorScreen;
