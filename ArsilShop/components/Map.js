import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import IconButton from '../components/UI/IconButton';

function Map({ setLocation }) {
  
    const region = {
        latitude:  21.42250013424047,
        longitude: 39.82615672680586,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const [selectedLocation, setSelectedLocation] = useState(region);
    
    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({ lat: lat, lng: lng });
    }

    const savePickedLocationHandler = () => {
        if (!selectedLocation) {
            Alert.alert(
                'No location picked!',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }
        setLocation(selectedLocation);
    }


    useLayoutEffect(() => {
        if (region) {
        return;
        }
    }, [savePickedLocationHandler, region]);

    return (
        <View>
            <Pressable>
                <IconButton
                    icon="save"
                    size={24}
                    color="#023F87"
                    onPress={savePickedLocationHandler}
                />
                <Text>
                    Confirm Selection
                </Text>
            </Pressable>
            <MapView
                style={styles.map}
                initialRegion={region}
                onPress={selectLocationHandler}
            >
                {selectedLocation && (
                <Marker
                    title="Picked Location"
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                />
            )}
            </MapView>
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
});
