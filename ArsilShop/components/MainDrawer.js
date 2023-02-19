import { useState } from 'react';
import {  View} from 'react-native';
import  CategoryScreen  from '../screens/Products/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/Account/RegisterScreen';
import TestScreen from '../screens/TestScreen';
import  CustomDrawer  from './CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import IconButton from './UI/IconButton';
import  { setCategories,searchProduct }  from '../util/http';
import SearchableDropdown from 'react-native-searchable-dropdown';
import OrderListScreen from '../screens/Orders/OrderListScreen';
import MapScreen from '../screens/MapScreen';


const Drawer = createDrawerNavigator();
  
function MainDrawer()
{
    const [newCatName, setCatNameHandler] = useState('')
    const [newCatInfo, setCatInfoHandler] = useState('')
    const [catInfoError, setCatInfoError] = useState('')
    const [catNameError, setCatNameError] = useState('')
    const [serverProducts, setServerProducts] = useState([]);
    const [productSearchName, setProductSearchName] = useState([]);

    const [saving, setLoading] = useState(false);

    function showCatModal() {
        setCatModal(true)
    }  

    function hideCatModal() {
        setCatModal(false)
    }

    function setNewCategoryName(data) {
        setCatNameHandler(data)
    }

    function setNewCategoryInfo(data) {
        setCatInfoHandler(data)
    }  
    
    async function searchServerForsearchProduct()
    {
        const data = await searchProduct(productSearchName);
        setServerProducts(data);
    }

    function HeaderComponent()
    {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderColor: '#C6C6C6',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 5,
                    backgroundColor: '#F8F8F8',
                    minWidth:'100%'
                }}>
                <SearchableDropdown
                    onTextChange={(text) => {
                        setProductSearchName(text)
                    }}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => alert(JSON.stringify(item))}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 0 }}
                    //suggestion container style
                    textInputStyle={{
                        //inserted text style
                        paddingHorizontal: 5,
                        borderWidth: 0,
                        borderColor: '#ccc',
                        backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        //single dropdown item style
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                    }}
                    itemTextStyle={{
                        //text style of a single dropdown item
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        //items container style you can pass maxHeight
                        //to restrict the items dropdown hieght
                        maxHeight: '50%',
                    }}
                    items={serverProducts}
                    //mapping of item array
                    defaultIndex={2}
                    //default selected item index
                    placeholder="Search For Product"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                    //To remove the underline from the android input
                />
            </View>);
    }
    
    return (
        <>
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={({ route, navigation }) => ({
                headerStyle: { backgroundColor: "#023F87" },
                headerTintColor: 'white',
                drawerActiveBackgroundColor: '#aa18ea',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                },
                headerRight: () => (
                    route.name === 'Products'
                    ? <IconButton
                        icon="search"
                        size={24}
                        color="white"
                        onPress={searchServerForsearchProduct}
                    />
                    : '')
                })
            }>
            <Drawer.Screen
            name="Home"
            component={HomeScreen}
            style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}
            options={{
                drawerIcon: ({ color }) => (
                <Ionicons name="home" size={22} color={color} />
                ),
            }}
            />
            <Drawer.Screen
            title="Business Registration"
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
                drawerIcon: ({ color }) => (
                <AntDesign name="user" size={22} color={color} />
                ),
            }}
            />
            <Drawer.Screen
            name="Products"
            label="Categories/ Products"
            component={CategoryScreen}
            options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                <AntDesign name="appstore1" size={22} color={color} />
                ),
                headerTitle: (props) =>  <HeaderComponent/>
            }}
            />
            <Drawer.Screen
            name="Carriers"
            component={TestScreen}
            options={{
                drawerIcon: ({ color }) => (
                    <AntDesign name="idcard" size={22}  color={color}/>
                ),
            }}
            />
            <Drawer.Screen
            name="Orders"
            component={OrderListScreen}
            options={{
                drawerIcon: ({ color }) => (
                <Ionicons name="settings-outline" size={22} color={color} />
                ),
            }}
            />
            <Drawer.Screen
            name="Map"
            component={MapScreen}
            options={{
                drawerIcon: ({ color }) => (
                <Ionicons name="settings-outline" size={22} color={color} />
                ),
            }}
            />
            </Drawer.Navigator>
        </>
    );
}
  
export default MainDrawer;