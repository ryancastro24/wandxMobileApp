import *  as React from 'react';
import { View, FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, Text, ActivityIndicator ,Searchbar} from 'react-native-paper';
import { ngrok_api } from '../libs/ngrok_api';

function ListScreen() {   


  const [searchQuery, setSearchQuery] = React.useState('');
    const [data,setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

  const navigation = useNavigation();

  const filteredData = data.filter(val =>
    val.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const sendData = ({name,location,open_hours,image,id}) => {
    const data = { name:name,location:location,open_hours:open_hours,image:image,id:id };
    navigation.navigate('TouristSpot', { data });
  };


    const renderer  = ({item}) =>{
        return (
        <Card onPress={() => sendData(item)} style={{marginTop:20 ,borderRadius:0,backgroundColor:"#7AB3B8"}}>
            <Card.Cover style={{borderRadius:0}} source={{ uri: `${ngrok_api}/storage/tourist_spot_images/${item.image}` }} />
            <Card.Content style={{marginTop:10,gap:6}}>
                <Text style={{fontWeight:"bold",color:"white"}} variant="titleLarge">{item.name}</Text>
                <Text style={{color:"white"}} variant="bodyMedium">{item.location}</Text>
                <Text style={{color:"white"}} variant="bodyMedium">{item.open_hours}</Text>
            </Card.Content>
        </Card>
        )
        
    }
    
    // 
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${ngrok_api}/api/tourist_spot`; // Replace with your machine's IP address

              const response = await fetch(apiUrl,{
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }),
          
              }); // Replace with your API endpoint
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
        <View style={{flex:1,paddingBottom:80}}>
          <Searchbar
            style={{borderRadius:0,backgroundColor:"white"}}
            placeholder="Search"
            onChangeText={(val) => setSearchQuery(val)}
            value={searchQuery}
          />

          <View style={{paddingHorizontal:10}}>
            <FlatList data={filteredData} renderItem={renderer}/>
          </View>
        </View>
      );
   
  }

export default ListScreen;
