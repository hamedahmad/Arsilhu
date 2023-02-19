import React, {useState,useEffect} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';


const LocationChooser = ({setTempLocation,setOpenMap}) => {
    const [pickedLocation, setPickedLocation] = useState();
    const [imageUri, setLocationImage] = useState(null)
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setTempLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
    
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED)
        {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED)
        {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    }
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#62BA46" }}
          onPress={getLocationHandler}>
          <Ionicons
              name="location-outline"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
          />
          <Text>Get You Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.actions, backgroundColor: "#008DB5" }}
          onPress={()=>setOpenMap(true)}>
              <Ionicons
              name="map"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
              />
          <Text>Pick On Map</Text>
        </TouchableOpacity>
      </View>
    );    
}

export default LocationChooser;


const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    color: "#fff",
    padding: 3,
    margin: 5,
    minWidth: '33%',
    paddingEnd:7,
  }
});
