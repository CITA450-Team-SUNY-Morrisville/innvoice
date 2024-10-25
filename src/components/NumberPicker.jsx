import React, { useState } from 'react';

const NumberPicker = ({ label, min = 1, max = 10, initialValue = 1, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
      if (onChange) {
        onChange(value + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
      if (onChange) {
        onChange(value - 1);
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#e0e0e0',
      border: '1px solid #ccc',
      borderRadius: '0', // Remove border radius for seamless appearance
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      height: '25px', // Set a fixed height for buttons
      width: '20px', // Set a fixed width for buttons
      display: 'flex', // Use flexbox to center content
      alignItems: 'center', // Center vertically
      justifyContent: 'center', // Center horizontally
    },
    numberInput: {
      width: '48px',
      textAlign: 'center',
      border: '1px solid #ccc',
      borderRadius: '0', // Remove border radius for seamless appearance
      // Hide the default number input arrows
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'textfield',
      height: '25px', // Set a fixed height for the input
    },
  };

  return (
    <div style={styles.container}>
      <label className="mr-2">{label}</label>
      <button
        style={styles.button}
        className="hover:bg-gray-300"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        readOnly
        style={styles.numberInput}
        className="border-t border-b border-gray-300"
      />
      <button
        style={styles.button}
        className="hover:bg-gray-300"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default NumberPicker;
