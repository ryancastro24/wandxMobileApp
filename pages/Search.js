import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator ,StyleSheet,Pressable} from 'react-native';
import { TextInput,Text,Button  } from 'react-native-paper';
import axios from 'axios';
// import { TextInput,Text } from 'react-native-paper';



const language = "Cebuano";

const Search = () => {
  const [inputText, setInputText] = useState('');
  const [openAiResponse, setOpenAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOpenAIResponse = async () => {
    const apiKey = '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'; // Replace with your actual API key

    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt:inputText,
          max_tokens:100,
          temperature:0.2
        },
        {
          headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      setOpenAiResponse(response.data.choices[0].text);
      setInputText('')
      setLoading(false);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);

      // Retry after a delay (e.g., 5 seconds) if rate-limited
      if (error.response && error.response.status === 429) {
        setTimeout(fetchOpenAIResponse, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch OpenAI response on component mount
    fetchOpenAIResponse();
  }, []); // Run the effect once when the component mounts

  const handleFetchOpenAIResponse = () => {
    // Fetch OpenAI response when the button is clicked
    fetchOpenAIResponse();
  };

  

  return (
    <View style={{ padding: 20, flex:1, alignItems:"center" }}>

        <View style={{marginTop:20}}>
                <Text style={{fontWeight:"bold"}} variant='headlineMedium'>Talk with Diosel</Text>
                 <Text style={{textAlign:"center",}}>powered by Chatgpt 3.5</Text>

            </View>
            <TextInput style={styles.search}
                    mode="outlined"
                    label="Search"                     
                    placeholder="Input Question"
                    right={<TextInput.Affix text="" />}
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
             />
        <Pressable style={styles.responseBtn} onPress={() => handleFetchOpenAIResponse()}>
            <Text style={{color:"white"}}>SUBMIT</Text>
        </Pressable>
      

      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {openAiResponse !== '' && (
        <View style={{marginTop:10,width:300}}>
          <Text style={{ marginTop:10, fontWeight: 'bold',fontSize:20 }}>Diosel:</Text>
          <Text style={{fontSize:17}}>{openAiResponse}</Text>
        </View>
      )}
    </View>
  );
};

export default Search;


const styles = StyleSheet.create({
    search: {
        width:300 ,
        marginTop:20,
    },
    responseBtn:{
        width:300,
        height:50,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
        backgroundColor:"#2C4043",
    },
  });