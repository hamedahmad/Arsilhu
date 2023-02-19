import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';
import {
  useIsFocused,
} from '@react-navigation/native';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import AModal from '../../components/AModal';
import LocationChooser from '../../components/UI/LocationChooser';
import Map from '../../components/Map';

const RegisterScreen = ({ navigation,route }) =>
{
  const initialLocation = {
    lat: route.params ? route.params.lat : 21.42250013424047,
    lng: route.params ? route.params.lng : 39.82615672680586
  };



  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [Address, setAddress] = useState('');
  const [tmpLocation, setTempLocation] = useState('');
  const [Location, setLocation] = useState('');
  const [Country, setCountry] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [ContactPerson, setContactPerson] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobilel, setMobilel] = useState('');
  const [State, setState] = useState('');
  const [Zipcode, setZipcode] = useState('');
  const [City, setCity] = useState('');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [locationModal, setOpenLocation] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.lat,
        lng: route.params.lng,
      };
      setOpenLocation(false);
      setLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  function openLocation() {
    console.log(Location);
    setOpenLocation(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <InputField
          label={'Company Name'}
          icon={
            <Ionicons
              name="md-briefcase-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          onChangeText={setCompanyName}
        />

        <InputField
          label={'Contact Person Full Name'}
          icon={
            <MaterialCommunityIcons
              name="account-box"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          onChangeText={setContactPerson}
        />

        <InputField
          label={'Email'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <InputField
          label={'Mobile'}
          icon={
            <Ionicons
              name="ios-call-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }          
          onChangeText={setMobilel}
          keyboardType=""
        />
        <InputField
          label={'Country'}
          icon={
            <Ionicons
              name="md-earth"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }          
          onChangeText={setMobilel}
          keyboardType=""
        />

        <InputField
          label={'State'}
          icon={
            <MaterialCommunityIcons
              name="sign-real-estate"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }          
          onChangeText={setState}
          keyboardType=""
        />

        <InputField
          label={'Zipcode'}
          icon={
            <Ionicons
              name="md-code-working-sharp"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }          
          onChangeText={setZipcode}
          keyboardType=""
        />

        <InputField
          label={'City'}
          icon={
            <Ionicons
              name="md-trail-sign"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          
          onChangeText={setCity}
          keyboardType=""
        />

        <Pressable
            onPress={openLocation}
        >
          <View style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginBottom: 15
            }}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <View>
              <Text>
                Location Address:  <LocationChooser setTempLocation={setLocation} setOpenMap={()=>navigation.navigate('Map')} navigation={ navigation}/>
              </Text>
              <Text>
                {Location.lat} {Location.lng}
              </Text>
            </View>
          </View>
        </Pressable>
        <InputField
          label={'Username'}
          icon={
            <Ionicons
              name="ios-finger-print"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          onChangeText={setUsername}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          onChangeText={setPassword}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          onChangeText={setCPassword}
        />
  {/*
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />*/}

        <CustomButton label={'Register'} onPress={() => {}} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});