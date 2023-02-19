import { useState } from "react";
import { ScrollView, StyleSheet,Text, TextInput, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { FRAGILITY_STEPS } from "../../data/reference-data";

function ProductInputList({
    setTitle,
    setFragility,
    setPackage_weight,
    setPackage_height,
    setPackage_width,
    setPackage_depth,
    setOther_info,
    product
    }) {

    let startTitle = '';
    let startFragility = 2;
    let startPackage_weight = '';
    let startPackage_height = '';
    let startPackage_width = '';
    let startPackage_depth = '';
    let startOther_info = '';
  
    if (product)
    {
        console.log(product.package_weight);
        startTitle = product.title;
        startFragility = product.fragility;
        startPackage_weight = product.package_weight;
        startPackage_height = product.package_height;
        startPackage_width = product.package_width;
        startPackage_depth = product.package_depth;
        startOther_info = product.other_info;
    }

    const [fragilityGrade, setCurrentFragilityGrade] = useState(FRAGILITY_STEPS[2][0]);
    const [fragilityDesc, setCurrentFragilityDesc] = useState(FRAGILITY_STEPS[2][1]);
    const [currentTitle, setInTitle] = useState(startTitle);
    const [currentFragility, setInFragility] = useState(startFragility);
    const [currentPackage_weight, setInPackage_weight] = useState(startPackage_weight);
    const [currentPackage_height, setInPackage_height] = useState(startPackage_height);
    const [currentPackage_width, setInPackage_width] = useState(startPackage_width);
    const [currentPackage_depth, setInPackage_depth] = useState(startPackage_depth);
    const [currentOther_info, setInOther_info] = useState(startOther_info);
    
    function setCurrentFragility(value) {

        const fragility = FRAGILITY_STEPS[value];
        setCurrentFragilityGrade(fragility[0]);
        setCurrentFragilityDesc(fragility[1]);
        setFragility(value);
    }
    
    return (
        <ScrollView style={{ backgroundColor: '#F8F8F8' }}>
            <View style={styles.input}>
                <View style={styles.label}>
                    <MaterialCommunityIcons name="weight-kilogram" color="#666" size={20} />
                    <Text>Product Title:</Text>                    
                </View>
                <TextInput
                    label={'Product Title'}
                    key="kpTitle"
                    onChangeText={setTitle}
                    style={styles.inputfield}
                    keyboardType='default'
                    placeholder="Fill Here..."
                    defaultValue={currentTitle}
                />                
            </View>
            <View style={styles.padd}>
                <View style={styles.inputnoborder}>
                    <MaterialCommunityIcons key={`fr_gi`} color="#666" name="glass-fragile" size={20} />
                    <Text>Fragility: <Text style={styles.small}>{fragilityGrade}</Text> </Text>
                </View>
                <Slider
                    key="kpF"
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    minimumTrackTintColor="#purpul"
                    maximumTrackTintColor="#000000"
                    onValueChange={setCurrentFragility}
                    value={currentFragility}
                    defaultValue={currentFragility}
                />
                <Text style={styles.desc}> {fragilityDesc}</Text>
            </View>
            <View style={styles.input}>
                <View style={styles.label}>
                    <MaterialCommunityIcons name="weight-kilogram" color="#666" size={20} />
                    <Text> Package Weight: </Text>
                </View>
                <TextInput
                    key="kpwgth"
                    label={'Package Weight'}
                    onChangeText={setPackage_weight}
                    style={styles.inputfield}
                    keyboardType='decimal-pad'
                    placeholder="Fill Here..."                    
                    defaultValue={currentPackage_weight ? currentPackage_weight.toString() : ''}
                />
            </View>
            <View style={styles.input}>
                <View style={styles.label}>
                    <MaterialCommunityIcons name="axis-arrow" size={20} color="#666" style={{ marginRight: 5 }} />
                    <Text> Dimentions: </Text>
                </View>
                 <View style={styles.label}>
                <TextInput
                    key="kpheighth"
                    label={'Package Height'}
                    onChangeText={setPackage_height}
                    style={styles.inputfields}
                    keyboardType='decimal-pad'
                    placeholder="W"
                    defaultValue={currentPackage_height ? currentPackage_height.toString() : ''}
                />
                <Text> x </Text>
                <TextInput
                    key="kpwidthe"
                    label={'Package Width'}
                    onChangeText={setPackage_width}
                    style={styles.inputfields}
                    keyboardType='decimal-pad'
                    placeholder="L"
                    defaultValue={currentPackage_width ? currentPackage_width.toString() : ''}
                />
                <Text> x </Text>
                <TextInput
                    key="kpdpth"
                    label={'Package Depth'}
                    onChangeText={setPackage_depth}
                    style={styles.inputfields}
                    keyboardType='decimal-pad'
                    placeholder="D"
                    defaultValue={currentPackage_depth ? currentPackage_depth.toString() : ''}
                />
                </View>
            </View>
            <View style={styles.input}>
                <View style={styles.label}>
                    <MaterialCommunityIcons name="information-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                    <Text> Other Info: </Text>
                </View>    
                <TextInput
                    multiline 
                    key="kpinfo"
                    label={'Other Info'}
                    onChangeText={setOther_info}
                    style={styles.inputfield}
                    keyboardType='default'
                    placeholder="Fill Here..."
                    defaultValue={currentOther_info}
                />
            </View>
        </ScrollView>
    )
}

export default ProductInputList;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'rgb(255,255,255)',
    flex: 1,
    height: '100%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 5,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
  product_image:
  {
    justifyContent: 'center',
    alignItems : 'center',
    width: '90%',
    height: 200,
    marginBottom: 9,
    backgroundColor: '#F8F8F8',
    flex: 1
    },
    small:
    {
        fontSize: 12,
        color: '#777777'
    },
    desc:
    {
        paddingLeft:12,
        fontSize: 11,
        color: '#777777'
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        marginBottom: 3
    },
    padd:
    {
        borderTopColor: '#552ba9',
        borderTopWidth: 1,
    },
    input: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderTopColor: '#552ba9',
        borderTopWidth: 1
    },
    inputnoborder: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15
    },
    inputfield:
    {
        borderWidth: 1,
        borderColor: '#eeeeee',
        textAlign: 'center',
        flexGrow: 1,
        width:'100%'
    },
    inputfields:
    {
        width: '20%',
        borderWidth: 1,
        borderColor: '#eeeeee',
        textAlign: 'center'
    }
})