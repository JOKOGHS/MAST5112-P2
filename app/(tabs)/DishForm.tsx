import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
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
  const navigation = useNavigation();
  const route = useRoute();

  const handleAddDish = () => {
    if (name && description && course && price) {
      const newDish: Dish = {
        id: Math.random().toString(),
        name,
        description,
        course,
        price: parseFloat(price),
      };

      // Call the addDish function passed from Index
      if (route.params?.addDish) {
        route.params.addDish(newDish);
      }

      // Clear input fields and navigate back
      setName('');
      setDescription('');
      setCourse('');
      setPrice('');
      navigation.goBack();
    } else {
      alert('Please fill in all fields');
    }
  };

  const navigateToChefScreen = () => {
    navigation.navigate('ChefScreen');
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

      <Button title="Add Dish" onPress={handleAddDish} />

      {/* Button to navigate to ChefScreen */}
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Chef Screen" onPress={navigateToChefScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFDAB9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Harlow Solid Italic',
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