import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, StyleSheet, View, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import { resultHash } from "../data/resultHash";

interface BmiResultScreenProps extends NativeStackScreenProps<RootStackParamList, 'BmiResultScreen'> {}

interface RootStackParamList {
    BmiResultScreen: {
        bmi: number;
    };
}

const BmiResultScreen: React.FC<BmiResultScreenProps> = ({ route, navigation }) => {
    const { bmi = 30 } = route.params;

    // Helper: Get the BMI data key based on BMI value
    const getBmiDataKey = (): keyof typeof resultHash => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi >= 18.5 && bmi <= 24.9) return 'Normal';
        if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
        return 'Obese';
    };

    // Styles
    const rangeHeaderStyle: StyleProp<TextStyle> = {
        color: resultHash[getBmiDataKey()].color,
        fontSize: 22,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 2,
    };

    // Handler for recalculating BMI
    const handleRecalculate = () => {
        navigation.goBack();
    };

    return (
        <MainLayout>
            <View style={styles.container}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Your Result</Text>

                    {/* Result View */}
                    <View style={styles.result}>
                        <Text style={rangeHeaderStyle}>{getBmiDataKey()}</Text>
                        <Text style={styles.value}>{bmi}</Text>
                        <Text style={styles.rangeLabel}>{getBmiDataKey()} BMI range:</Text>
                        <Text style={styles.rangeText}>{resultHash[getBmiDataKey()].range}</Text>
                        <Text style={styles.description}>{resultHash[getBmiDataKey()].text}</Text>
                    </View>

                    {/* Recalculate Button */}
                    <View style={{ marginTop: '5%' }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.btnStyle}
                            onPress={handleRecalculate}
                        >
                            <Text style={styles.btnTextStyle}>Re-Calculate your BMI</Text>
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
    header: {
        color: 'white',
        fontSize: 40,
        fontWeight: '600',
    },
    result: {
        backgroundColor: "#1D1F32",
        flex: 1,
        marginVertical: '5%',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: '10%',
    },
    value: {
        color: "white",
        fontSize: 90,
        fontWeight: '700',
        marginVertical: '10%',
    },
    rangeLabel: {
        color: '#8E8E98',
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.75,
    },
    rangeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.75,
        marginTop: '3%',
    },
    description: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 0.75,
        marginTop: '15%',
        textAlign: 'center',
    },
    btnStyle: {
        backgroundColor: "#D83456",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    btnTextStyle: {
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase',
    },
});

export default BmiResultScreen;
