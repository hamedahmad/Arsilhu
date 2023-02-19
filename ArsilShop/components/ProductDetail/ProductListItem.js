import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import IconButton from '../UI/IconButton';

const dim = Dimensions.get('screen');

function ProductListItem({
    id,
    title,
    fragility,
    package_weight,
    price_sector,
    package_height,
    package_width,
    package_depth,
    other_info,
    lineColor
})
{
  const navigation = useNavigation();


  const settings = {
    weight_unit: 'kg',
    length_unit: 'cm'
  }

  let weight_icon = "weight-kilogram"
  switch (settings.weight_unit) {
    case 'kg':
        weight_icon = "weight-kilogram"
      break;
    case 'g':
        weight_icon = "weight-gram"
      break;
    case 'pound':
        weight_icon = "weight-pound"
      break;  
    default:
      weight_icon = "weight"
      break;
  }

  function selectProductItemHandler() {
    navigation.navigate('ProductDetailsScreen', {productId: id,title});
  }

  function FragilityLenght() {

    let x = (fragility > 0) ? [] : <MaterialCommunityIcons key={`fr_start`} color="white" name="image-filter-center-focus-strong" size={17} />

    for (let index = 0; index < fragility; index++) {
      x.push(<MaterialCommunityIcons key={`fr_${index}`} color="white" name="glass-fragile" size={17} />)
    }
    return (x)
  }

  return (
    <View style={{ ...styles.productItem, borderLeftColor: lineColor,borderBottomWidth:1,borderBottomColor:lineColor }}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => (pressed ? [styles.buttonPressed,] : null)}
        onPress={selectProductItemHandler}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: `${FileSystem.documentDirectory}/Photo_${id}.jpg` }} style={styles.image} />
          <View style={styles.desc}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.moreInfo}>{other_info}</Text>
          </View> 
        </View>
        <View style={styles.dimensions}>
          <View style={styles.dim}>
            <MaterialCommunityIcons name="axis-arrow" size={17} color={lineColor} />
            <View style={styles.dim}>
              <Text> {package_width}</Text>
              <Text style={styles.gray}> x </Text>
              <Text>{package_height}</Text>
              <Text style={styles.gray}> x </Text>
              <Text>{package_depth}</Text>
            </View>
          </View>
          <View style={styles.dim}>
            <MaterialCommunityIcons name={weight_icon} size={17}  color={lineColor}/>
            <Text> {package_weight} { settings.weight_unit }</Text>
          </View>
          <View style={styles.dim}>
              <FragilityLenght/>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  productItem: {
    marginLeft: 5,
    marginRight: 5,
    padding:0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,    
    borderLeftWidth:7,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: '#F8F8F8',
    elevation: 4,
    marginBottom:5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    padding:5,
    borderRadius: 9,
    overflow: 'hidden',
    flexDirection:'row'
  },
  image: {
    width: parseInt(dim.width/5),
    height: parseInt(dim.width / 5),
    borderWidth: 1,
    borderColor:'#c3c3c3'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18,
    padding:0
  },
  desc: {
    flex: 1,
    flexDirection: 'column',
    padding:0,
    paddingLeft: 5
  },
  gray: {
    color: '#999999'
  },
  dimensions: {
    flex:1,
    width:'100%',
    paddingLeft: 5,
    paddingBottom: 5,
    backgroundColor: '#c5c5c5',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight:5
  },
  dim: {
    color: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreInfo: {
    flexDirection:'row',
    color: '#555555',
    fontSize: 12,
    paddingLeft: 9
  }
});