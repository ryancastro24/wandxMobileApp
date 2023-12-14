import * as React from 'react';
import  {Text, View, StyleSheet} from 'react-native'
import { TextInput } from 'react-native-paper';

function Search(){
    const [text, setText] = React.useState('');
    return(
        <View style={{flex:1, alignItems: 'center'}}>
                <TextInput style={styles.search}
                    mode="outlined"
                    label="Search"
                    placeholder="Input Question"
                    right={<TextInput.Affix text="" />}
                />
        </View>

    )
}

export default Search;

const styles = StyleSheet.create({
    search: {
        width: 300,
    }
  });