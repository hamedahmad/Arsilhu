import { Pressable, View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';

function CategoryGridTile({ title, color, id, onPress, onLongPress, more_info }) {

  const imageSources = {
    1: require('../assets/images/art_and_crafts.png'),
    2: require('../assets/images/automotive.png'),
    3: require('../assets/images/baby_and_toddler.png'),
    4: require('../assets/images/beauty_and_personal_care.png'),
    5: require('../assets/images/food.png'),
    6: require('../assets/images/books_and_office_supplies.png'),
    7: require('../assets/images/clothing_and_apparel.png'),
    8: require('../assets/images/electronics.png'),
    9: require('../assets/images/garden_and_patio.png'),
    10: require('../assets/images/grocery.png'),
    11: require('../assets/images/health_and_wellness.png'),
    12: require('../assets/images/home_and_kitchen.png'),
    13: require('../assets/images/jewelry_and_watches.png'),
    14: require('../assets/images/music_and_entertainment.png'),
    15: require('../assets/images/pet_supplies.png'),
    16: require('../assets/images/shoes_and_handbags.png'),
    17: require('../assets/images/sports_and_outdoors.png'),
    18: require('../assets/images/tools_and_home_improvement.png'),
    19: require('../assets/images/toys_and_games.png'),
    20: require('../assets/images/travel.png')
  };
  return (
    <View style={styles.gridItem}>
      <ImageBackground
        source={imageSources[id]}
        style={{flex: 1 }}
      >
        <Pressable
          android_ripple={{ color: color }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View style={[styles.innerContainer, { backgroundColor: 'rgba( 250,250, 250, 0.5)', opacity: 1 }]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.small_title}>{more_info}</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 0,
    height: 130,
    borderRadius: 0,
    elevation: 4,
    backgroundColor: '#F8F8F8',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 0,
    borderBottomWidth: 1,
    borderColor:'#555555',
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 17,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color:'#white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  small_title: {
    color:'#333355',
    fontSize: 14,
  },
});
