import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Dish {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const Index: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]); // List of dishes
  const [searchTerm, setSearchTerm] = useState(''); // Search term for course or dish
  const navigation = useNavigation();
  const route = useRoute();

  // If the route has params (new dishes), add them to the dish list
  React.useEffect(() => {
    if (route.params?.newDish) {
      setDishes([...dishes, route.params.newDish]);
    }
  }, [route.params?.newDish]);

  // Function to filter dishes by name or course
  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dish List</Text>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by dish or course"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Button to navigate to the DishForm */}
      <Button
        title="Add New Dish"
        onPress={() => navigation.navigate('DishForm', { addDish: (newDish: Dish) => setDishes([...dishes, newDish]) })}
      />

      {/* Display the filtered list of dishes */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text>{item.name} - {item.course} - R{item.price.toFixed(2)}</Text>
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
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for the heading
    color: '#000', // Optional text color
  },
  dishItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishText: {
    fontSize: 18,
    fontFamily: 'Harlow Solid Italic', // Harlow Solid Italic font for the dish items
    color: '#000', // Optional text color
  },
});

export default Index;
