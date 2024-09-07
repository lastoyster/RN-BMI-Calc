import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export interface SliderSelectProps {
  label?: string;
  suffix?: string;
  onValueChange?: (value: number) => void;
}

const SliderSelect: React.FC<SliderSelectProps> = ({
  label = 'Height',
  suffix = 'cm',
  onValueChange,
}) => {
  // State for displaying the current value
  const [displayValue, setDisplayValue] = React.useState<number>(0);

  // Handler for slider value changes
  const handleChange = (value: number) => {
    setDisplayValue(value);
    onValueChange?.(value); // Optional chaining for onValueChange
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      
      {/* Display Value */}
      <Text style={styles.valueText}>
        {displayValue} <Text style={styles.label}>{suffix}</Text>
      </Text>

      {/* Slider */}
      <Slider
        style={styles.slider}
        thumbTintColor="#D83456"
        step={1}
        minimumValue={0}
        maximumValue={300}
        onValueChange={handleChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#888994"
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111426',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  label: {
    color: '#8E8E98',
    fontSize: 20,
    fontWeight: '600',
  },
  valueText: {
    color: 'white',
    fontSize: 60,
    fontWeight: '600',
    marginBottom: '5%',
  },
  slider: {
    width: '100%',
    height: 40, // Reduced slider height for better UI balance
  },
});

export default SliderSelect;
