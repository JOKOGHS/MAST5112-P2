import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';

interface Dish {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

interface DishFormProps {
  addDish: (dish: Dish) => void; // Function to add a dish
}

const DishForm: React.FC<DishFormProps> = ({ addDish }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const handleAddDish = () => {
    if (name && description && course && price) {
      const newDish: Dish = {
        id: Math.random().toString(),
        name,
        description,
        course,
        price: parseFloat(price),
      };

      addDish(newDish); // Call the addDish function to pass the dish back to the list
      setName(''); // Reset fields after submission
      setDescription('');
      setCourse('');
      setPrice('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a New Dish</Text>

      {/* Input for Dish Name */}
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter dish name"
      />

      {/* Input for Dish Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      {/* Course Picker */}
      <Text style={styles.label}>Course</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a course" value="" />
        <Picker.Item label="Appetizer" value="Appetizer" />
        <Picker.Item label="Main Course" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      {/* Input for Price */}
      <Text style={styles.label}>Price (Rands)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      {/* Button to Add Dish */}
      <Button title="Add Dish" onPress={handleAddDish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});

export default DishForm;

