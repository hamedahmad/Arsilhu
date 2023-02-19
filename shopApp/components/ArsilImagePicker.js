import { Button,  View, Vibration, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ArsilImagePicker({ setImageUrl })
{
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (!result.canceled)
    {
      setImageUrl(result.assets[0].uri);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}