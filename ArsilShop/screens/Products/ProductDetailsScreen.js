import { useState, useLayoutEffect, useEffect} from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Pressable } from 'react-native';

import ProductDetails from '../../components/ProductDetail/ProductDetails';
import {fetchProduct, deleteProduct, deleteProductCategories} from '../../util/database';
import * as FileSystem from 'expo-file-system';
import IconButton from "../../components/UI/IconButton";
import { LinearGradient } from "expo-linear-gradient";
import AModal from "../../components/AModal";

const dim = Dimensions.get('screen');


function ProductDetailsScreen({ navigation,route }) {

  const getCategoryProducts = (categoryItem)=>
  {
    navigation.navigate('ProductListScreen',categoryItem);
  }

  const [productInfo, setProductDetailInfo] = useState(null)
  const productId = route.params.productId;
  const [dbInitialized, setDbInitialized] = useState(false);
  const [confirmModalShow, setConfirmModal] = useState(false);

  useLayoutEffect(() => {
    async function getDetails(id) {
      const dbData = await fetchProduct(id);
      const allCats = dbData.map((item) => {
        return {id:item.category_id,title:item.category_name}
      })
      const pDetails = dbData[0];
      pDetails.Categories = allCats;

      setProductDetailInfo(pDetails);
      setDbInitialized(true);
    }
    getDetails(productId);
  }, [])

  async function refreshDetails()
  {
    const dbData = await fetchProduct(productId);
    const allCats = dbData.map((item) => {
      return {id:item.category_id,title:item.category_name}
    })
    const pDetails = dbData[0];
    pDetails.Categories = allCats;

    setProductDetailInfo(pDetails);    
  }
  
  useEffect(() => {
        const focusHandler = navigation.addListener('focus', async () => {
          refreshDetails();
        });
        return focusHandler;
    }, [navigation,refreshDetails]);

  if (!dbInitialized) {
    return <ActivityIndicator size="large" />;
  }
  

  function putInDelivery() {
    
  }

  async function removeProduct() {
    await deleteProduct(productId);
    await deleteProductCategories(productId);
    const fileUri = `${FileSystem.documentDirectory}/Photo_${productId}.jpg`;
    const exists = FileSystem.getInfoAsync(fileUri)
    console.log(exists,fileUri);
    if (exists.exists) {
      console.log('deleteing');
      FileSystem.deleteAsync(fileUri);
    }
        
    navigation.navigate('ProductListScreen',{categoryId:productInfo.category_id})
  }

  function hideConfirmation() {
    setConfirmModal(false)
  }

  function editProduct() {
    navigation.navigate('ProductAddScreen',{product:productInfo ,categoryId:productInfo.category_id});
  }

  return (
    <View>
      <AModal
        title= 'Delete Confirmation'
        body={<Text>Are you sure you want to remove this product from your Store?</Text>}
        cancleText="Cancle"
        submitText="Delete"
        onSubmit={removeProduct}
        onCancle={hideConfirmation}
        modalVisible={confirmModalShow}
        ></AModal>
        
      
      <ScrollView style={styles.rootContainer}>
        <Image source={{ uri: `${FileSystem.documentDirectory}/Photo_${productId}.jpg` }} style={styles.image} />
        <Text style={styles.title}>{productInfo.title}</Text>
        <View
          style={styles.main}>
          <ProductDetails
            id={productInfo.id}
            fragility={productInfo.fragility}
            package_weight={productInfo.package_weight}
            price_sector={productInfo.price_sector}
            package_height={productInfo.package_height}
            package_width={productInfo.package_width}
            package_depth={productInfo.package_depth}
            other_info={productInfo.other_info}
            Categories={productInfo.Categories}
            getCategoryProducts = {getCategoryProducts}
          />
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <View>
          <LinearGradient  colors={['#62BA46', '#008DB5']} style={styles.icn}>
            <IconButton
              icon="ios-construct-outline"
              color="white"
              size={29}
              onPress={editProduct}
            ></IconButton>
          </LinearGradient>
        </View>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={putInDelivery}
        >
          <Image source={require('../../assets/packageaddd.png')} style={styles.orderIcon} resizeMode="center" />
        </Pressable>
        <View>
          <LinearGradient  colors={['#62BA46', '#008DB5']} style={styles.icn}>
            <IconButton
              icon="trash-sharp"
              color="#FF4D4D"
              size={29}
              onPress={()=>{setConfirmModal(true)}}
              ></IconButton>
            </LinearGradient>
        </View>
      </View>
      <View style={styles.blockdown}>
        <Text style={styles.textdown}>Edit</Text>
        <Text style={styles.textdown}>Add To Delivery Order</Text>
        <Text style={styles.textdown}>Delete</Text>
      </View>
    </View>
  );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor:'#F8F8F8'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: '#8c0f71',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
  image:
  {
    with: '100%',
    height:173,
  },
  main:
  {
    with: '100%',
    height: parseInt(dim.height),
  },
  order:
  {
    borderColor: '#1d80fe',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 9,
    backgroundColor: '#F8F8F8'
  },
  icn:
  {
    borderColor: '#F8F8F8',
    borderRadius: 29,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    backgroundColor:'#023F87',
    marginTop:-50
  },
  orderIcon:
  {
    width:90,
    height:90,
    borderColor: '#F8F8F8',
    borderRadius: 45,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 0,
    marginTop:-50
  },
  buttons:
  {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'baseline',
    alignItems:'center',
    with: '100%',
    backgroundColor: '#DFE8F2',
    height: 47,
    position: 'absolute',
    top: dim.height - 165, 
    width: dim.width,
  },
  blockdown:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    with: '100%',
    backgroundColor: '#DFE8F2',
    height: 23,
    color:'#023F87',
    position: 'absolute',
    top: dim.height - 119, 
    width: dim.width,
  },
  textdown:
  {
    alignItems:'center',
    width: 120,
    color: '#023F87',
    textAlign: 'center',
    fontSize: 12,
    marginTop:-13
  }
});
