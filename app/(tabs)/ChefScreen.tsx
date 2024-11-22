import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    { id: '4', name: 'Chocolate Cake', description: 'Rich and moist chocolate cake topped with creamy icing.', course: 'Dessert', price: 40.00 },
    { id: '5', name: 'Tomato Soup', description: 'Warm and hearty tomato soup served with fresh bread.', course: 'Starter', price: 35.00 },
    { id: '6', name: 'Lemon Meringue Pie', description: 'Tangy lemon filling topped with fluffy meringue, baked to perfection.', course: 'Dessert', price: 50.00 },
    { id: '7', name: 'Prawn Cocktail', description: 'Chilled prawns served with a tangy cocktail sauce.', course: 'Starter', price: 60.00 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState<string | null>(null); // Tracks the active filter
  const navigation = useNavigation();

  // Function to handle dish removal
  const removeDish = (dishId: string) => {
    setDishes(dishes.filter(dish => dish.id !== dishId));
  };

  // Filter dishes based on search term and active course filter
  const filteredDishes = dishes.filter(dish =>
    (!filterCourse || dish.course === filterCourse) &&
    (dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.course.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Cycle through filters (Starters, Main, Dessert, All)
  const handleFilterToggle = () => {
    const filters = [null, 'Starter', 'Main', 'Dessert'];
    const currentIndex = filters.indexOf(filterCourse);
    const nextIndex = (currentIndex + 1) % filters.length;
    setFilterCourse(filters[nextIndex]);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.heading}>Chef Dish List</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search by dish or course"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterToggle}>
        <Icon name="filter-list" size={20} color="#fff" />
        <Text style={styles.filterButtonText}>
          {filterCourse ? `Filter: ${filterCourse}` : 'Show All'}
        </Text>
      </TouchableOpacity>

      {/* Add New Dish Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('DishForm', {
            addToChefScreen: (newDish: Dish) => setDishes((prevDishes) => [...prevDishes, newDish]),
          })
        }
      >
        <Icon name="add" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add New Dish</Text>
      </TouchableOpacity>

      {/* Display Filtered Dishes */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <View style={styles.dishInfo}>
              <Text style={styles.dishTitle}>{item.name}</Text>
              <Text style={styles.dishCourse}>{item.course} - R{item.price.toFixed(2)}</Text>
              <Text style={styles.dishDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeDish(item.id)}
            >
              <Icon name="delete" size={24} color="#f44336" />
            </TouchableOpacity>
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
    backgroundColor: '#FFF8E1',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  dishCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  dishInfo: {
    flex: 1,
    marginRight: 10,
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dishCourse: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
  dishDescription: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    padding: 8,
  },
});

export default ChefScreen;

