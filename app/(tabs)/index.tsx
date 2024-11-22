import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Index: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Your Role</Text>

      {/* Button to navigate to ChefScreen */}
      <TouchableOpacity
        style={[styles.button, styles.chefButton]}
        onPress={() => navigation.navigate('ChefScreen')}
      >
        <Text style={styles.buttonText}>Chef Menu</Text>
      </TouchableOpacity>

      {/* Button to navigate to UserScreen */}
      <TouchableOpacity
        style={[styles.button, styles.userButton]}
        onPress={() => navigation.navigate('UserScreen')}
      >
        <Text style={styles.buttonText}>User Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FCE4EC', // Soft pink background
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    fontFamily: 'Roboto',
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  chefButton: {
    backgroundColor: '#8E24AA', // Purple for Chef
  },
  userButton: {
    backgroundColor: '#FF4081', // Pink for User
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;


