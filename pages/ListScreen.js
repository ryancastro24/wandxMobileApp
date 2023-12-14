import *  as React from 'react';
import { View, FlatList} from 'react-native'

import { Card, Text } from 'react-native-paper';
function ListScreen() {

    const [data,setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const renderer  = ({item}) =>{
        return (
        <Card style={{marginTop:20}}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Content style={{marginTop:10}}>
                <Text variant="titleLarge">{item.name}</Text>
                <Text variant="bodyMedium">{item.location}</Text>
                <Text variant="bodyMedium">{item.open_hours}</Text>
            </Card.Content>
        </Card>
        )
        
    }
    
    // 
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'http://192.168.254.116:8000/api/tourist_spot'; // Replace with your machine's IP address

              const response = await fetch(apiUrl); // Replace with your API endpoint
              const result = await response.json();
              setData(result);
            } catch (error) {
              setError(error);
            } finally {
              setLoading(false);
            }
          };
      fetchData();
    },[])

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
        <View style={{paddingHorizontal:10}}>
           <FlatList data={data} renderItem={renderer}/>
        </View>
      );
   
  }

export default ListScreen;
