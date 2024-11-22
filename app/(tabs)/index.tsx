import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Index: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Your Role</Text>

      {/* Button to navigate to ChefScreen */}
      <Button
        title="Chef Menu"
        onPress={() => navigation.navigate('ChefScreen')}
      />

      {/* Button to navigate to UserScreen */}
      <Button
        title="User Menu"
        onPress={() => navigation.navigate('UserScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFDAB9', // Light peach background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Harlow Solid Italic',
    color: '#000',
    textAlign: 'center',
  },
});

export default Index;

