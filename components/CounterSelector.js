import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Props Interface
export interface CounterSelectProps {
  label?: string;
  suffix?: string;
  onValueChange?: (value: number) => void;
  defaultValue?: number;
}

// CounterSelect Component
const CounterSelect: React.FC<CounterSelectProps> = ({
  label = 'Weight', onValueChange, suffix = '', defaultValue = 0
}) => {

  // State for display value
  const [displayValue, setDisplayValue] = React.useState<number>(defaultValue);

  // Increment Handler
  const handleAdd = () => {
    const newValue = displayValue + 1;
    setDisplayValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  // Decrement Handler
  const handleSubtract = () => {
    if (displayValue > 0) {
      const newValue = displayValue - 1;
      setDisplayValue(newValue);
      onValueChange && onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label.toUpperCase()}</Text>

      {/* Displayed Value */}
      <Text style={styles.valueText}>
        {displayValue}
        <Text style={styles.suffix}> {suffix}</Text>
      </Text>

      {/* Button Group */}
      <View style={styles.btnGroup}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handleSubtract}
        >
          <AntDesign name="minus" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handleAdd}
        >
          <AntDesign name="plus" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Style Definitions
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111426",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  label: {
    color: '#8E8E98',
    fontSize: 20,
    fontWeight: "600",
  },
  valueText: {
    color: "white",
    fontSize: 60,
    fontWeight: "600",
    marginBottom: '5%',
  },
  suffix: {
    fontSize: 20,
    color: '#8E8E98',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  btn: {
    backgroundColor: '#1D2032',
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
  },
});

export default CounterSelect;
