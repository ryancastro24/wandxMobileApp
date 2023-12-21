// FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Text } from 'react-native-paper';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch all favorite items from AsyncStorage
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [favorites]); // Fetch favorites on component mount

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={{marginTop:20}}>
              <Card style={{borderRadius:0}}>
                <Card.Cover style={{borderRadius:0}} source={{ uri: `http://192.168.254.100:8000/storage/tourist_spot_images/${item.image}` }} />
                <Card.Content style={{marginTop:10}}>
                    <Text style={{marginBottom:10,fontWeight:"bold"}} variant="titleLarge">{item.name}</Text>
                    <Text variant="bodyLarge">{item.location}</Text>
                    <Text variant="bodyLarge">{item.open_hours}</Text>

                </Card.Content>
        </Card>
            </View>
          )}
        />
      ) : (
        <Text>No favorites yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Favorites;
