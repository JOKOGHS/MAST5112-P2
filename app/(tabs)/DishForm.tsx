import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DishForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const handleAddDish = () => {
    if (name && description && course && price) {
      const newDish = {
        id: Math.random().toString(),
        name,
        description,
        course,
        price: parseFloat(price),
      };

      // Pass the new dish back to the index
      route.params?.addDish(newDish);

      // Clear input fields after submission
      setName('');
      setDescription('');
      setCourse('');
      setPrice('');

      navigation.goBack(); // Navigate back to the dish list
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a New Dish</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter dish name"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

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

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price in Rands"
        keyboardType="numeric"
      />

      {/* Button to Add Dish */}
      <Button title="Add Dish" onPress={handleAddDish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFDAB9', // Light peach color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for the heading
    color: '#000', // Optional text color
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for labels
    color: '#000', // Optional text color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for inputs
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for picker items
  },
});
export default DishForm;
