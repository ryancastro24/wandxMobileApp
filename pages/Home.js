import * as React from 'react';
import { View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { List } from 'react-native-paper';

function Home({language}) {
  const [expanded, setExpanded] = React.useState(true);
  const [questionData,setQuestionData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
 

  const finalQuestionData = questionData.filter(val => val.language === language );

  const handlePress = () => setExpanded(!expanded);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const apiUrl = 'http://192.168.254.116:8000/api/questions'; // Replace with your machine's IP address

          const response = await fetch(apiUrl); // Replace with your API endpoint
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
    <View>
      <Text>Loading...</Text>
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

      <Text variant='headlineSmall'> Siargao</Text>
      <Divider style={styles.divider} bold={true}/>
      <Text style={styles.text}>
            Siargao Island is a popular destination in the Philippines known for
            its pristine beaches, surfing spots, and natural beauty. It is
            located in the northeastern part of Mindanao, the second-largest
            island in the Philippines and part of the province of Surigao del
            Norte.
      </Text>
      <Text style={{textAlign:'justify',marginTop:15}}>
            Siargao Island is a popular destination in the Philippines known for
            its pristine beaches, surfing spots, and natural beauty. It is
            located in the northeastern part of Mindanao, the second-largest
            island in the Philippines and part of the province of Surigao del
            Norte.{'\n'}
      </Text>
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
