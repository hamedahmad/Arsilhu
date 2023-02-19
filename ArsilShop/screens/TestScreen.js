
import { View, Text, Button} from 'react-native';

import { fetchCategories, fetchAllProducts,fetchSettings  } from '../util/database';

function TestScreen({route}) {

  async function showCats() {
    const cats = await fetchCategories();
    console.log('AllCats:',cats.length);
  }

  async function showProds() {
    const prods = await fetchAllProducts();
    console.log('Allprods:',prods.length);
  }

  async function showSettings() {
    const rows = await fetchSettings();
    console.log('Allrows:',rows,rows.length);
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>TESTEEEE</Text>
      <Button onPress={showCats} title="Get Cats"></Button>
      <Button onPress={showProds} title="Get Prods"></Button>
      <Button onPress={showSettings} title="Get Settings"></Button>
    </View>
  );
}

export default TestScreen;
