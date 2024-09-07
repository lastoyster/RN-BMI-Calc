import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function App() {
  // State hooks
  const [height, setHeight] = useState('');
  const [heightPlaceholder, setHeightPlaceholder] = useState('Your Height in cm');
  const [weight, setWeight] = useState('');
  const [weightPlaceholder, setWeightPlaceholder] = useState('Your Weight in kg');
  const [bmi, setBmi] = useState('');
  const [bmiColor, setBmiColor] = useState('black');
  const [selectedUnit, setSelectedUnit] = useState('International System');

  // Calculate BMI
  const onClickCalculateButton = () => {
    if (!height || !weight) {
      Alert.alert('Error', 'Please enter valid height and weight.');
      return;
    }

    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
      Alert.alert('Error', 'Please enter numeric values.');
      return;
    }

    let bmiCalculated = 0;

    if (selectedUnit === 'Imperial System') {
      bmiCalculated = ((parsedWeight / (parsedHeight * parsedHeight)) * 703).toFixed(1);
    } else {
      const heightM = parsedHeight / 100;
      bmiCalculated = (parsedWeight / (heightM * heightM)).toFixed(1);
    }

    // Set BMI color based on value
    if (bmiCalculated < 18.5) setBmiColor('blue');
    else if (bmiCalculated < 25) setBmiColor('green');
    else if (bmiCalculated < 30) setBmiColor('orange');
    else setBmiColor('red');

    setBmi(bmiCalculated);
  };

  // Clear inputs and result
  const onClickClearButton = () => {
    setHeight('');
    setWeight('');
    setBmi('');
  };

  // Toggle placeholders based on selected unit
  const togglePlaceholders = (unit) => {
    setHeight('');
    setWeight('');
    setBmi('');

    if (unit === 'Imperial System') {
      setHeightPlaceholder('Your Height in inches');
      setWeightPlaceholder('Your Weight in lbs');
    } else {
      setHeightPlaceholder('Your Height in cm');
      setWeightPlaceholder('Your Weight in kg');
    }
  };

  // Options for select menu
  const data = [
    { key: 0, value: 'International System' },
    { key: 1, value: 'Imperial System' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Header Title */}
        <Text style={styles.header}>BMI CALCULATOR</Text>

        {/* Unit System Options */}
        <SelectList
          data={data}
          setSelected={(val) => {
            setSelectedUnit(val);
            togglePlaceholders(val);
          }}
          defaultOption={{ key: 0, value: 'International System' }}
          search={false}
        />

        {/* Height and weight input fields */}
        <TextInput
          style={styles.inputStyle}
          value={height}
          onChangeText={setHeight}
          placeholder={heightPlaceholder}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputStyle}
          value={weight}
          onChangeText={setWeight}
          placeholder={weightPlaceholder}
          keyboardType="numeric"
        />

        {/* Calculate button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={onClickCalculateButton}
        >
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>

        {/* Clear button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={onClickClearButton}
        >
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
      </View>

      {/* BMI Result */}
      <Text style={[styles.output, { color: bmiColor }]}>{bmi}</Text>

      {/* Explanations of Result */}
      <Text style={styles.explanations}>
        <Text style={{ fontWeight: 'bold' }}>BODY MASS INDEX</Text>{'\n'}
        Below 18.5: <Text style={{ color: 'blue', fontWeight: 'bold' }}>Underweight</Text>{'\n'}
        18.5 - 24.9: <Text style={{ color: 'green', fontWeight: 'bold' }}>Healthy Weight</Text>{'\n'}
        25.0 - 29.9: <Text style={{ color: 'orange', fontWeight: 'bold' }}>Overweight</Text>{'\n'}
        30.0 and above: <Text style={{ color: 'red', fontWeight: 'bold' }}>Obesity</Text>
      </Text>
    </SafeAreaView>
  );
}

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf9f6',
  },
  wrapper: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  header: {
    fontSize: 26,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputStyle: {
    fontSize: 20,
    padding: 10,
    marginTop: 10,
    height: 50,
    width: 300,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  output: {
    fontSize: 44,
    fontWeight: 'bold',
    marginTop: 10,
  },
  explanations: {
    fontSize: 20,
    marginTop: 5,
  },
});
