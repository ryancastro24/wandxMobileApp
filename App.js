import * as React from 'react';
import { View,SafeAreaView ,StatusBar,Platform,Pressable,DrawerLayoutAndroid,StyleSheet, FlatList, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './pages/Home';
import ListScreen from './pages/ListScreen';
import Favorites from './pages/Favorites';
import { Text } from 'react-native-paper';
import { Icon } from 'react-native-paper'
import { List } from 'react-native-paper';
import Search from './pages/Search';
import { languages } from './libs/sampleData';
import ListOfLanguages from './components/ListOfLanguages';
import TouristSpot from './components/TouristSpot';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ListScreen" options={{headerShown:false}} component={ListScreen} />
    <Stack.Screen name="TouristSpot" component={TouristSpot} />
    {/* Add more screens for the ListStack if needed */}
  </Stack.Navigator>
);


function MyTabs({language}) {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" 
          children={props => <Home language={language} {...props} />}
           initialParams={{ language }} options={{
          headerShown:false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}  />
      <Tab.Screen name="List" component={ListStack} options={{
          headerShown:false,
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-text" color={color} size={size} />
          ),
        }}
     />

    <Tab.Screen name="Favorites" component={Favorites} options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
     />

<Tab.Screen name="Search" component={Search}  options={{
          headerShown:false,
          tabBarLabel: 'Ask Question',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-question" color={color} size={size} />
          ),
        }}  />
    </Tab.Navigator>
  );
}



export default function App() {
  const drawer = React.useRef(null);
  const [expanded, setExpanded] = React.useState(true);
  const [language, setLanguage] = React.useState('English');

  const handlePress = () => setExpanded(!expanded);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View>
      <Pressable style={styles.closeModalBtn}  onPress={() => drawer.current.closeDrawer()}>
          <Icon
            source="close"
            color={'white'}
            size={15}
          />

      </Pressable>
    </View>

    <ListOfLanguages languages={languages} drawer={drawer} setLanguage={setLanguage}/>
      
    </View>
  );

  return (
    <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, flex:1}}>
      <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          drawerPosition={'right'}
          renderNavigationView={navigationView}>


      <View style={{flex:1}}>
      <View style={styles.appHeader}>
          <Text style={{color:'white',}} variant='headlineSmall'>Wandx</Text>
            <View>
              <Pressable  onPress={() => drawer.current.openDrawer()}>
                  <Icon
                    source="cog"
                    color={'white'}
                    size={20}
                  />
              </Pressable>
            </View>
            
      </View>

      <View style={styles.appSubHeader}>
          <Text>Your Ultimate Siargao Adventure Awaits!</Text>
      </View>

   
        <NavigationContainer>
          
          <MyTabs language={language} />
        </NavigationContainer>

        </View>
        </DrawerLayoutAndroid>

     </SafeAreaView>

  );

}



// app styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  appHeader:{
    paddingHorizontal:20, 
    paddingVertical:8, 
    backgroundColor:"#2C4043", 
    justifyContent:"space-between", 
    alignItems:"center", 
    flexDirection:"row", 
    height:50
  },
  appSubHeader:{
    paddingHorizontal:20, 
    paddingVertical:8, 
    backgroundColor:"#D0D0D0", 
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection:"row", 
    height:30
  },
  closeModalBtn:{
    width:30,
    height:30,    
    backgroundColor:"#2C4043",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:4,
  }
});