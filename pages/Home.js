import * as React from 'react';
import { View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { List, ActivityIndicator } from 'react-native-paper';
import { ngrok_api } from '../libs/ngrok_api';



function Home({language}) {
  const [expanded, setExpanded] = React.useState(true);
  const [questionData,setQuestionData] = React.useState([]);
  const [descriptions,setDescriptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
 

  const finalQuestionData = questionData.filter(val => val.language === language );

  const finalDescriptionData = descriptions.filter(val => val.language === language );

  const handlePress = () => setExpanded(!expanded);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const apiUrl = `${ngrok_api}/api/descriptions`; // Replace with your machine's IP address

          const response = await fetch(apiUrl,{
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
      
          }); // Replace with your API endpoint
          const result = await response.json();
          setDescriptions(result);
        } catch (error) { 
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  fetchData();
},[]);


  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const apiUrl = `${ngrok_api}/api/questions`; // Replace with your machine's IP address

          const response = await fetch(apiUrl,{
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
      
          }); // Replace with your API endpoint
          const result = await response.json();
          setQuestionData(result);
        } catch (error) { 
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  fetchData();
},[]);

if (loading) {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator size="large" animating={true} color="#2C4043" />
    </View>
  );
}

if (error) {
  return (
    <View>
      <Text>Error: {error.message}</Text>
    </View>
  );
}

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text variant='headlineLarge' style={{ textAlign: 'center', }}>
        Siargao Island
      </Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/siargao.jpg')}
          resizeMode={'contain'}
        />
      </View>

      <Text variant='titleLarge'>Why Siargao?</Text>
      <Divider style={styles.divider} bold={true}/>

      {finalDescriptionData.map(val => <View key={val.id}>

        <Text style={styles.text}>
            {val.description_one}
        </Text>

        <Text style={{textAlign:'justify',marginTop:15}}>
            {val.description_two}
        </Text>
      </View>)}
      
      <Divider style={styles.divider} bold={true}/>

      <List.Section title="Frequently Asked Questions">

      {finalQuestionData.map(val =>  <List.Accordion titleNumberOfLines={50}  key={val.id}
        title={`Q${val.question_number} ${val.text}`}
        left={props => <List.Icon {...props} icon="chat-question" />}>
        <List.Item titleNumberOfLines={100}  title={val.answer} />
      </List.Accordion>
     ) }
    
    </List.Section>

     
    </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
  },
  imageContainer: {
    marginVertical:5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 230, // Set the height as per your requirement
  },
  divider: {
    marginVertical: 10,
    backgroundColor: 'black', // Set the color of the divider
  },
  text: {
    marginTop: 8,
    textAlign: 'justify'

  }
});
