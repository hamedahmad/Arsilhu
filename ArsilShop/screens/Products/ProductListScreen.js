import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductListItem from '../../components/ProductDetail/ProductListItem';
import { fetchProducts } from '../../util/database';

function ProductListScreen({ route, navigation })
{
  const catId = route.params.categoryId;

  const [displayedProducts, setDisplayedProducts] = useState([]);

  async function getCatProducts()
    {
      const dbProductList =  await fetchProducts(catId);
      setDisplayedProducts(dbProductList);
    }

  /*useEffect(() => {
    getCatProducts(catId)
  },[catId])*/

  useEffect(() => {
        const focusHandler = navigation.addListener('focus', async () => {
          getCatProducts()
        });
        return focusHandler;
  }, [navigation, getCatProducts]);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData)=>renderProductItem(itemData,navigation)}
      />
    </View>
  );
}

export default ProductListScreen;

function renderProductItem(itemData, navigation)
{
  const item = itemData.item;

  const itemColors = [
    '#1d80fe',
    '#1c63e2',
    '#3846c6',
    '#542ba9',
    '#552ba9',
    '#71118d',
    '#8c0f71',
    '#c64638',
    '#e2611c',
    '#f88003'
  ];

  const colorIndex = itemData.index % 10;    
  const lineColor = itemColors[colorIndex];

  const productItemProps = {
    id: item.id,
    title: item.title,
    fragility: item.fragility,
    package_depth: item.package_depth,
    package_height: item.package_height,
    package_weight: item.package_weight,
    package_width: item.package_width,
    price_sector: item.price_sector,
    other_info: item.other_info,
    lineColor: lineColor
  };

  return <ProductListItem {...productItemProps} navigation={navigation} />;
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor:'#F8F8F8'
  },
  text: {
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  }
});