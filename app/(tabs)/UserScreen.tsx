import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons

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
    { id: '6', name: 'Tomato Soup', description: 'Warm and hearty tomato soup served with fresh bread.', course: 'Starter', price: 35.00 },
    { id: '7', name: 'Grilled Steak', description: 'Perfectly grilled steak served with mashed potatoes and veggies.', course: 'Main', price: 150.00 },
    { id: '8', name: 'Margarita Pizza', description: 'Classic pizza topped with mozzarella cheese, tomatoes, and basil.', course: 'Main', price: 75.00 },
    { id: '9', name: 'Lemon Meringue Pie', description: 'Tangy lemon filling topped with fluffy meringue, baked to perfection.', course: 'Dessert', price: 50.00 },
    { id: '10', name: 'Prawn Cocktail', description: 'Chilled prawns served with a tangy cocktail sauce.', course: 'Starter', price: 60.00 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  // Calculate the average price
  const averagePrice =
    dishes.length > 0
      ? dishes.reduce((total, dish) => total + dish.price, 0) / dishes.length
      : 0;

  // Filter dishes based on search term
  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Menu</Text>

      {/* Average Price Section */}
      <View style={styles.averagePriceContainer}>
        <Text style={styles.averagePriceText}>Average Price:</Text>
        <Text style={styles.averagePriceValue}>R{averagePrice.toFixed(2)}</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by dish name or course"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Dish List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <Text style={styles.dishTitle}>{item.name}</Text>
            <Text style={styles.dishDetails}>
              {item.course} - R{item.price.toFixed(2)}
            </Text>
            <Text style={styles.dishDescription}>{item.description}</Text>
          </View>
        )}
      />

      {/* Go Back Button with Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="home" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  averagePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  averagePriceText: {
    fontSize: 18,
    color: '#333',
  },
  averagePriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  dishCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  dishDetails: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 14,
    color: '#555',
  },
  iconButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 60,
    height: 60,
  },
});

export default UserScreen;


