import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

interface Dish {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const UserScreen: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    { id: '1', name: 'Spaghetti Bolognese', description: 'Classic Italian pasta dish', course: 'Main', price: 120 },
    { id: '2', name: 'Chicken Caesar Salad', description: 'Crispy chicken with Caesar dressing', course: 'Starter', price: 90 },
    { id: '3', name: 'Chocolate Cake', description: 'Rich and moist chocolate cake', course: 'Dessert', price: 50 },
    { id: '4', name: 'Beef Wellington', description: 'Tender beef wrapped in puff pastry', course: 'Main', price: 250 },
    { id: '5', name: 'Vegetable Stir-Fry', description: 'Stir-fried vegetables in soy sauce', course: 'Main', price: 80 },
    { id: '6', name: 'Lemon Meringue Pie', description: 'Tangy lemon filling with meringue topping', course: 'Dessert', price: 60 },
    { id: '7', name: 'Fish Tacos', description: 'Fish served with fresh toppings in a soft taco shell', course: 'Starter', price: 85 },
    { id: '8', name: 'Cheeseburger', description: 'Juicy beef patty with cheese', course: 'Main', price: 100 },
    { id: '9', name: 'Peking Duck', description: 'Crispy duck served with pancakes and hoisin sauce', course: 'Main', price: 220 },
    { id: '10', name: 'Grilled Salmon', description: 'Salmon grilled to perfection', course: 'Main', price: 180 },
    { id: '11', name: 'Pasta Primavera', description: 'Pasta with a variety of fresh vegetables', course: 'Main', price: 110 },
    { id: '12', name: 'Vegetable Soup', description: 'A hearty vegetable soup', course: 'Starter', price: 70 },
    { id: '13', name: 'Apple Pie', description: 'Traditional American dessert with apples', course: 'Dessert', price: 65 },
    { id: '14', name: 'Eggplant Parmesan', description: 'Breaded eggplant baked with cheese', course: 'Main', price: 120 },
    { id: '15', name: 'Chicken Tikka Masala', description: 'Spicy Indian curry with chicken', course: 'Main', price: 130 },
    { id: '16', name: 'Crispy Calamari', description: 'Deep-fried squid served with dipping sauce', course: 'Starter', price: 95 },
    { id: '17', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil', course: 'Starter', price: 75 },
    { id: '18', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert with layers of cream', course: 'Dessert', price: 70 },
    { id: '19', name: 'Lamb Chops', description: 'Grilled lamb chops with rosemary', course: 'Main', price: 200 },
    { id: '20', name: 'Vegetable Samosas', description: 'Fried pastry filled with spiced vegetables', course: 'Starter', price: 50 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter dishes based on search term (searching by name or course)
  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  navigation.navigate('DishForm', {
    addToUserScreen: (newDish) => setDishes([...dishes, newDish]),
  });
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dish List</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by dish name or course"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Display Filtered Dishes */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text style={styles.dishText}>{item.name} - {item.course} - R{item.price.toFixed(2)}</Text>
            <Text>{item.description}</Text>
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
    backgroundColor: '#FFDAB9', // Light peach color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for the heading
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dishItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishText: {
    fontSize: 18,
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for the dish items
    color: '#000',
  },
});

export default UserScreen;