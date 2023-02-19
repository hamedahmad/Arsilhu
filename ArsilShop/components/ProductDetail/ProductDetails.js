import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ProductDetails({
  id,
  fragility,
  package_weight,
  price_sector,
  package_width,
  package_height,
  package_depth,
  other_info,
  Categories,
  getCategoryProducts
}) {
  
  function RelatedCategoryList() {
    return Categories.map((item,index) => {
      return (<Pressable
        key= {`key_of_cat_${index}`}
        style={styles.catitem} onPress={() => getCategoryProducts({
        title: "Product List",
        categoryId: item.id,
        categoryName: item.title
        })}>
        <Text>{item.title}</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
      </Pressable>);
    })
  }

  return (
    <View style={[styles.details]}>
      <View style={styles.horisontal}>
        <Text style={styles.label}> <MaterialCommunityIcons key={`fr_gi`} color="#666" name="glass-fragile" size={20} /> Fragility: </Text>
        <Text style={styles.value}> {fragility} </Text>
      </View>
      <View style={styles.horisontal}>
        <Text style={styles.label}> <MaterialCommunityIcons name="weight-kilogram" color="#666" size={20} />Package Weight: </Text>
        <Text style={styles.value}> {package_weight} </Text>
      </View>      
      <View style={styles.horisontal}>
        <View style={styles.label}>
            <MaterialCommunityIcons name="axis-arrow" size={20} color="#666" />
            <Text style={{color:'white'}}> Dimentions: </Text>
        </View>
        <View  style={styles.horisontal2}>
          <Text style={styles.smaller}>Width {package_width} </Text>
          <Text> x </Text>
          <Text style={styles.smaller}>Height {package_height} </Text>
          <Text> x </Text>
          <Text style={styles.smaller}>Depth {package_depth} </Text>
        </View>
      </View>
      <View style={styles.horisontal}>
          <View style={styles.label}>
            <Text style={{color:'white'}}> 
              <MaterialCommunityIcons name="information-outline" size={20} color="#666" /> Other Information:
            </Text>
          </View>
        <Text style={[styles.info]}>
          {other_info}
        </Text>
      </View>
      <View style={styles.categories}>
        <Text style={{marginBottom:5,color:'white',fontWeight:'600'}}>Related Categories:</Text>
        <RelatedCategoryList ></RelatedCategoryList>
      </View>
    </View>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
    color: '#023F87'
  },
  horisontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 3,
    borderWidth: 1,
    width: '100%',
    borderColor: '#AFBAC7',
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    fontSize:11,
  },
  horisontal2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    marginBottom: 3,  
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    color: '#023F87'
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ABDCE9',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    padding: 5,
    width: 150,
    color:'white',
  },
  info: {
    flexWrap: 'wrap',
    flexShrink: 1,
    marginHorizontal: 4,
    maxWidth:'100%',
    fontSize: 12,
    color: '#023F87',
    color: ''
  },
  smaller: {
    fontSize: 12,
    color: '#023F87',
  },
  catitem:
  {
    padding: 3,
    paddingLeft:9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#DFE8F2',
    borderRadius: 9,
    borderBottomLeftRadius: 0,
    borderTopStartRadius: 0,
    borderColor: '#AFBAC7',
    borderWidth: 1,
    color: '#F8F8F8',
    marginBottom: 5,
  },
  categories:
  {
    borderRadius: 9,
    width: '100%',
    padding: 9,
    borderWidth: 1,
    backgroundColor: '#008DB5',
    borderColor: '#023F87'
  }
});
