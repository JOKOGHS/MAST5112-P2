import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Dish {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const ChefScreen: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    { id: '1', name: 'Spaghetti Bolognese', description: 'A classic Italian pasta dish with rich tomato and beef sauce.', course: 'Main', price: 85.50 },
    { id: '2', name: 'Caesar Salad', description: 'Crispy romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.', course: 'Starter', price: 45.00 },
    { id: '3', name: 'Chicken Curry', description: 'Spicy chicken curry with rice and naan bread.', course: 'Main', price: 95.00 },
    { id: '4', name: 'Fish and Chips', description: 'Crispy battered fish with fries and tartar sauce.', course: 'Main', price: 70.00 },
    { id: '5', name: 'Chocolate Cake', description: 'Rich and moist chocolate cake topped with creamy icing.', course: 'Dessert', price: 40.00 },
    { id: '6', name: 'Tomato Soup', description: 'Warm and hearty tomato soup served with fresh bread.', course: 'Starter', price: 35.00 },
    { id: '7', name: 'Grilled Steak', description: 'Perfectly grilled steak served with mashed potatoes and veggies.', course: 'Main', price: 150.00 },
    { id: '8', name: 'Margarita Pizza', description: 'Classic pizza topped with mozzarella cheese, tomatoes, and basil.', course: 'Main', price: 75.00 },
    { id: '9', name: 'Lemon Meringue Pie', description: 'Tangy lemon filling topped with fluffy meringue, baked to perfection.', course: 'Dessert', price: 50.00 },
    { id: '10', name: 'Prawn Cocktail', description: 'Chilled prawns served with a tangy cocktail sauce.', course: 'Starter', price: 60.00 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  // Function to filter dishes by name or course
  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle dish removal
  const removeDish = (dishId: string) => {
    setDishes(dishes.filter(dish => dish.id !== dishId));
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dish List</Text>

      {/* Search bar */}
      <TextInput
        style={styles.input}
        placeholder="Search by dish or course"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Add New Dish Button */}
      <Button
        title="Add New Dish"
        onPress={() => navigation.navigate('DishForm')}
      />

     {/* Button to Go Back to Index.tsx */}
      <View style={{ marginTop: 10 }}>
      <Button
       title="Go Back Home"
      onPress={() => navigation.goBack()}
      />
      </View>


      {/* Display filtered dishes */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text style={styles.dishText}>
              {item.name} - {item.course} - R{item.price.toFixed(2)}
            </Text>
            <Text style={styles.dishDescription}>{item.description}</Text>
            <Button
              title="Remove Dish"
              onPress={() => removeDish(item.id)}
            />
          </View>
        )}
      />
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
  dishItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishText: {
    fontSize: 18,
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ChefScreen;