import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Dish {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const DishForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const navigation = useNavigation();
  const route = useRoute();

  // Function to handle adding the new dish
  const handleAddDish = () => {
    // Clear any previous error messages
    setError('');

    // Validate inputs
    if (!name || !description || !course || !price) {
      setError('All fields are required!');
      return;
    }

    if (isNaN(parseFloat(price))) {
      setError('Price must be a valid number!');
      return;
    }

    const newDish: Dish = {
      id: Math.random().toString(),
      name,
      description,
      course,
      price: parseFloat(price),
    };

    // Add dish to ChefScreen or UserScreen based on params
    if (route.params?.addToChefScreen) {
      route.params.addToChefScreen(newDish);
    }
    if (route.params?.addToUserScreen) {
      route.params.addToUserScreen(newDish);
    }

    // Clear form after adding
    setName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a New Dish</Text>

      {/* Dish Name Input */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter dish name"
      />

      {/* Description Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      {/* Course Picker */}
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

      {/* Price Input */}
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price in Rands"
        keyboardType="numeric"
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Add Dish Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddDish}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </TouchableOpacity>

      {/* Navigate Back to ChefScreen */}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => {
          // Check if ChefScreen exists in the route params
          if (route.params?.navigateToChefScreen) {
            navigation.navigate('ChefScreen'); // Explicitly navigate to ChefScreen
          } else {
            navigation.goBack(); // Default back navigation
          }
        }}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5D4037',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    marginBottom: 15,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DishForm;


