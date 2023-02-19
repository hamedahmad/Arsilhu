import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles'

function FormInputItem({
    label,
    value,
    placeholder,
    error,
    onChangeText
})
{
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput
                value={value}
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChangeText}
            ></TextInput>
            {error ? <Text style={styles.error}>{error}</Text> : ''}     
        </View>  
    );
}
export default FormInputItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        backgroundColor:GlobalStyles.colors.lightgray,
        color: GlobalStyles.colors.darkblue2,
        borderColor: GlobalStyles.colors.darkblue2,
  },
  label:{
    
  },
  error:{
    fontWeight:"bold",
    fontSize:12,
    padding:15,
    color:"#ff1111"
  },
});
