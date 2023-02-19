import {useState,useEffect,useCallback}  from 'react';
import {View, ImageBackground,StyleSheet} from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CarrierScreen } from './screens/CarrierScreen';
import  ProductListScreen  from './screens/Products/ProductListScreen';
import ProductDetailsScreen from './screens//Products/ProductDetailsScreen';
import ProductAddScreen from './screens/Products/ProductAddScreen';
import IconButton from './components/UI/IconButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainDrawer from './components/MainDrawer';
import { initCat,initProdducts,initCatProd,fetchAllProducts,initSettings,fetchSettings,initOrders,dropTable } from './util/database';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import OrderListScreen from './screens/Orders/OrderListScreen';
import MapScreen from './screens/MapScreen';
const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);
  const [saveProductStatus, saveProduct] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await initCat();
        await initProdducts();
        await initCatProd();
        await initSettings();
        await initOrders();
        await fetchSettings();

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
         let allprods = await fetchAllProducts();
        /*
        await dropTable('orders');
        console.log(allprods);
        allprods = await fetchProducts(4);
        console.log(allprods);
         allprods = await fetchProducts(6);
        console.log(allprods);
         allprods = await fetchProducts(7);
        console.log(allprods);
         allprods = await fetchProducts(8);
        console.log(allprods);
         allprods = await fetchProducts(9);
        console.log(allprods);
         allprods = await fetchProducts(10);
        console.log(allprods);
         allprods = await fetchProducts(11);
         allprods = await fetchProducts(12);
        console.log(allprods);
         allprods = await fetchProducts(13);
        console.log(allprods);
         allprods = await fetchProducts(14);
        console.log(allprods);
         allprods = await fetchProducts(15);
        console.log(allprods);
         allprods = await fetchProducts(16);
        console.log(allprods);
         allprods = await fetchProducts(17);
        console.log(allprods);
         allprods = await fetchProducts(18);
        console.log(allprods);
         allprods = await fetchProducts(19);
        console.log(allprods);
         allprods = await fetchProducts(20);
        console.log(allprods);*/
        setDbInitialized(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }
  
  const ArsilTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  };
      
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ImageBackground source={require('./assets/bg.png')}
          style={{ flex: 1, width: '100%', height: '100%', }}
          resizeMode="cover">
          <StatusBar style="light" translucent backgroundColor="#023F87" />
          <NavigationContainer theme={ArsilTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: "#023F87" },
                cardStyle: { backgroundColor: "transperent" }
              }}
            >
              <Stack.Screen
                options={{
                  title: 'Arsilhu Shop System',
                  headerStyle: { backgroundColor: "#023F87" }
                }}
                name="MainDrawer" component={MainDrawer}
              />
              <Stack.Screen
                name="ProductListScreen"
                component={ProductListScreen}
                options={({ route, navigation }) => ({
                  title: route.params.categoryName+' Products',
                  headerShown: true,
                  backgroundColor: "#023F87",
                  headerRight: () => (
                    <IconButton
                      icon="add"
                      size={24}
                      color="white"
                      onPress={() => navigation.navigate('ProductAddScreen', {categoryId: route.params.categoryId})}
                    />
                  )
                })}
              />
              <Stack.Screen
                name="ProductAddScreen"
                component={ProductAddScreen}
                options={({ route, navigation }) => ({
                  headerShown: true,
                  title: 'Add New Product',
                  headerStyle: { backgroundColor: "#023F87" },
                  headerRight: () => (
                    <IconButton/>
                  )
                })}
              />
              <Stack.Screen
                name="ProductDetailsScreen"
                component={ProductDetailsScreen}
                options={({ route, navigation }) => ({
                  headerShown: true,
                  title: route.params.title+' Details',
                  headerStyle: { backgroundColor: "#023F87" }
                })} />
              <Stack.Screen
                name="OrderListScreen"
                component={OrderListScreen}
                options={({ route, navigation }) => ({
                  headerShown: true,
                  title: 'Order List',
                  headerStyle: { backgroundColor: "#023F87" }
                })} />
            </Stack.Navigator>
          </NavigationContainer>
        </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: "#023F87",
    borderBottomWidth: StyleSheet.hairlineWidth
  }

});