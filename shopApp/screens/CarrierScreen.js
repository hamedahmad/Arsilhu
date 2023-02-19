import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';


function CarrierScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('ProductListOverview', {
        categoryId: itemData.item.id,
      });
      }
      
    function longPressHandler(itemData) {      
        console.log(`${itemData.item.id}`);
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        image={itemData.item.image}
        onPress={pressHandler}
        onLongPress={longPressHandler}        
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CarrierScreen;
