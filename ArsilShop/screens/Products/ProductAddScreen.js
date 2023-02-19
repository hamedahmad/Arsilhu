import { View, Vibration, Image, StyleSheet,  Text, TouchableOpacity, ImageBackground,  Dimensions } from 'react-native';
import {useState, useEffect,useLayoutEffect} from 'react';
import * as FileSystem from 'expo-file-system';
import { insertProduct, insertProductCategories, updateProducts, deleteProductCategories } from '../../util/database';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { CATEGORIES } from '../../data/reference-data';
import Button from '../../components/UI/Button';
import ProductInputList from '../../components/ProductDetail/ProductInputList';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '../../components/UI/IconButton';

const dim = Dimensions.get('screen');
  
function ProductAddScreen({ navigation, route })
{
  
  const selectedcat = CATEGORIES.find((item) => item.id === route.params.categoryId);

    let productId = null;
    let startTitle = '';
    let startFragility = 2;
    let startImageUrl = null;
    let startPackage_weight = null;
    let startPackage_height = null;
    let startPackage_width = null;
    let startPackage_depth = null;
    let startOther_info = '';
    let startCategories = [selectedcat];
  
    if (route.params.product)
    {
      const product = route.params.product;
      productId = product.id;
      startImageUrl = `${FileSystem.documentDirectory}/Photo_${product.id}.jpg`
      startTitle = product.title;
      startFragility = product.fragility;
      startPackage_weight = product.package_weight;
      startPackage_height = product.package_height;
      startPackage_width = product.package_width;
      startPackage_depth = product.package_depth;
      startOther_info = product.other_info;
      startCategories = product.Categories;
    }
  
  const [currentTitle, setTitle] = useState(startTitle);
  const [currentImageUrl, setImageUrl] = useState(startImageUrl);
  const [currentFragility, setFragility] = useState(startFragility);
  const [currentPackage_weight, setPackage_weight] = useState(startPackage_weight);
  const [currentPrice_sector, setPrice_sector] = useState();
  const [currentPackage_height, setPackage_height] = useState(startPackage_height);
  const [currentPackage_width, setPackage_width] = useState(startPackage_width);
  const [currentPackage_depth, setPackage_depth] = useState(startPackage_depth);
  const [currentOther_info, setOther_info] = useState(startOther_info);
  const [selectedCategories, setSelectedCategories] = useState(startCategories);
  
useLayoutEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <IconButton
            icon="save"
            size={24}
            color="white" route
            onPress={saveProduct}
          />
      ),
    });
  }, [navigation,currentTitle,currentFragility,currentPackage_weight,currentPackage_height,currentPackage_width,currentPackage_depth,currentOther_info,selectedCategories]);
  
  const K_OPTIONS = CATEGORIES.map((cat) => {
    return {
        item: cat.title,
        id: cat.id,
      }
  })
  
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled)
      {
        setImageUrl(result.assets[0].uri);
      }
    }

  function onMultiChange() {
    return (item) => setSelectedCategories(xorBy(selectedCategories, [item], 'id'))
  }

  function saveImage(id) {
    FileSystem.moveAsync({
      from: currentImageUrl,
      to: `${FileSystem.documentDirectory}/Photo_${id}.jpg`,
    }).then(() => {
      //Vibration.vibrate();
      navigation.navigate('ProductDetailsScreen',{productId:id,title:currentTitle});
    });
  }

  async function saveProduct() {
    const newProduct = {
      id: productId,
      title: currentTitle,
      fragility: currentFragility,
      package_weight: currentPackage_weight,
      price_sector: '',
      package_height: currentPackage_height,
      package_width: currentPackage_width,
      package_depth: currentPackage_depth,
      other_info: currentOther_info
    }
    console.log(newProduct);
    if(!productId)
      productId = await insertProduct(newProduct);
    else
      await updateProducts(newProduct);
      
    const CategoriesIds = selectedCategories.map((item) => {
      return item.id
    });
    await deleteProductCategories(productId);
    await insertProductCategories(productId, CategoriesIds);
    saveImage(productId);
  }
//{ uri: currentImageUrl }
  return (
    <View style={{ backgroundColor: '#cccccc', flex: 1, padding: 1, marginVertical: 0,backgroundColor:'#023F87' }}
      key="keymainaddsr"
    >
      <TouchableOpacity
        style={[styles.button, styles.topelement]}
        onPress={pickImage}>
        <ImageBackground
          style={
          {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 9,
            width: '100%'
          }}
          source={require('../../assets/unknown.jpg')}
          resizeMode='contain'
        >
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 9,
              width: '100%',
              backgroundColor: "rgba(0,0,0,0.75)",
            }}
          >
            <Image style={styles.fullphoto}  source={{uri:currentImageUrl}} />
            <Text style={styles.buttonText}>Set Product Image</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <SelectBox
          label="Select Related Categories"
          options={K_OPTIONS}
          selectedValues={selectedCategories}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          containerStyle={{
            backgroundColor: '#eeeeee',
            paddingRight: 5,
            paddingLeft: 5,
            borderTopColor: '#ccc',
            borderBottomWidth: 1,
          }}
          labelStyle={{ backgroundColor: '#eeeeee' ,paddingLeft:5}}
          optionContainerStyle={{ backgroundColor: '#eeeeee' ,paddingLeft:5}}
          inputFilterStyle={{ backgroundColor: '#eeeeee',paddingLeft:5 }}
          inputFilterContainerStyle={{ backgroundColor: '#eeeeee' ,paddingLeft:5}}
          style={{ height: 153, }}
      />
      <ProductInputList
      setTitle = {setTitle}
      setFragility = {setFragility}
      setPackage_weight = {setPackage_weight}
      setPackage_height = {setPackage_height}
      setPackage_width = {setPackage_width}
      setPackage_depth = {setPackage_depth}
      setOther_info = {setOther_info}
      product = {route.params.product}
      />
  </View>
  );
}

export default ProductAddScreen;

const styles = StyleSheet.create({
  product_image:
  {
    justifyContent: 'center',
    alignItems : 'center',
    width: '90%',
    height: 200,
    marginBottom: 9,
    backgroundColor: '#F8F8F8',
    flex: 2
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  button: {
    padding: 3,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent:'center',
    borderRadius: 9
  },
  buttonText: {
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    marginTop: 5,
    fontSize: 13,
    backgroundColor: '#121233',
    width: '100%',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  fullphoto: {
    width: '100%',
    height: 150,
  },
  topelement: {
    height: 173,
    backgroundColor: '#333333',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 9,
    overflow:'hidden'
  }
})