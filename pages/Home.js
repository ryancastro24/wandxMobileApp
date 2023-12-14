import * as React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { List } from 'react-native-paper';

function Home() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
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
      <Divider style={styles.divider} />
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

      <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
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
    textAlign: 'justify'

  }
});
