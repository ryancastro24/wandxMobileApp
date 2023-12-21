import * as React from 'react';
import  { View, Pressable,StyleSheet ,ScrollView} from 'react-native'
import { useRoute ,useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-paper';
import { Icon,List } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ngrok_api } from '../libs/ngrok_api';


function TouristSpot(){

  const [specificQuestionData,setSpecificQuestionData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

    const route = useRoute();
    const { data } = route.params || {};
    const navigation = useNavigation();
    const [isFavorite,setIsFavorite] = React.useState(false);

    React.useEffect(() => {
        if (data && data.name) {
          // Use the name from the data as the title
          navigation.setOptions({
            title: data.name,
          });
        }
      }, [data]);


      React.useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${ngrok_api}/api/specific_questions/${data.id - 1}`; // Replace with your machine's IP address
    
              const response = await fetch(apiUrl,{
                headers: new Headers({
                 "ngrok-skip-browser-warning": "69420",
                 }),
                }); // Replace with your API endpoint
              const result = await response.json();
              setSpecificQuestionData(result);
            } catch (error) { 
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      fetchData();
    },[]);

    let sampleLanguage = "English";
    const finalSpecificQuestionData = specificQuestionData.filter(val => val.language === sampleLanguage);
      
  React.useEffect(() => {
    // Fetch favorite status from AsyncStorage
    const fetchFavoriteStatus = async () => {
      try {
        const storedFavoriteStatus = await AsyncStorage.getItem('favoriteStatus');
        if (storedFavoriteStatus) {
          setIsFavorite(JSON.parse(storedFavoriteStatus));
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, []); // Fetch favorite status on component mount

  const toggleFavorite = async () => {
    // Toggle favorite status
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    try {
        await AsyncStorage.setItem('favoriteStatus', JSON.stringify(newFavoriteStatus));
      
        // Fetch all favorite items from AsyncStorage and update state
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      
        if (newFavoriteStatus) {
          // Check if the spot is not already in favorites
          const isAlreadyFavorite = Array.isArray(favoritesArray) && favoritesArray.some(item => item.name === data.name);
      
          if (!isAlreadyFavorite) {
            // Add the current data to favorites
            const updatedFavorites = [...favoritesArray, data];
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            
          } else {
            console.log('Data is already in favorites:', data);
          }
        } else {
          // Remove the current data from favorites
          const updatedFavorites = Array.isArray(favoritesArray)
            ? favoritesArray.filter(item => item.name !== data.name)
            : [];
          await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          console.log('Data removed from favorites:', data);
        }
      } catch (error) {
        console.error('Error storing/fetching favorites:', error);
      }
      
      
      
  };
      
    
    return(
      <ScrollView>
        <View style={{flex:1}}>
                 {/* dre ka mag start og edit */}
        <Card style={{borderRadius:0}}>
            <Card.Cover style={{borderRadius:0}} source={{ uri: `${ngrok_api}/storage/tourist_spot_images/${data.image}` }} />
                <Card.Content style={{marginTop:10}}>
                    <Text style={{marginBottom:10,fontWeight:"bold"}} variant="titleLarge">Open At: {data.open_hours}</Text>
                    <Text variant="bodyLarge">{data.location}</Text>


                    <View>
                            <Pressable style={{...styles.favoritesBtn, backgroundColor: isFavorite ? "blue" : "gray" , width:isFavorite? 100 : 150}} onPress={toggleFavorite}>
                                        <Icon
                                            source="star"
                                            color={"white"}
                                            size={20}
                                        />
                                        <Text style={{color:"white"}} variant='bodyLarge'>{isFavorite ? "Favorite" : "Add to Favorites"}</Text>
                            </Pressable>
                    </View>

                </Card.Content>
        </Card>

        <List.Section title="Frequently Asked Questions">

        {finalSpecificQuestionData.map(val =>  <List.Accordion titleNumberOfLines={50}  key={val.id}
            title={`Q${val.question_number} ${val.text}`}
            left={props => <List.Icon {...props} icon="chat-question" />}>
            <List.Item titleNumberOfLines={100}  title={val.answer} />
          </List.Accordion>
        ) }
     </List.Section>
        </View>

        </ScrollView>

    )
}

export default TouristSpot;


const styles = StyleSheet.create({
    favoritesBtn: {
        flexDirection:"row",
        alignItems:"center",
        gap:3,
        height:40,
        justifyContent:"center",
        borderRadius:5,
        marginTop:10
    }
})