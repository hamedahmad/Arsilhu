import { FlatList,Text, TextInput,View, StyleSheet, ActivityIndicator} from 'react-native';
import { useState, useLayoutEffect } from 'react';
import CategoryGridTile from '../../components/CategoryGridTile';
import AModal from "../../components/AModal";
import FormInputItem from "../../components/UI/FormInputItem";
import  { removeCategories,updateCategories }  from '../../util/http';
import IconButton from '../../components/UI/IconButton';
import { fetchCategories } from '../../util/database';
import { CATEGORIES } from '../../data/reference-data';

function CategoryScreen({ navigation })
{
    const [selectedCategory, setSelectedCategory] = useState({id:0});
    const [updatedCatName, changeCategoryName] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [dbInitialized, setDbInitialized] = useState(false);

    useLayoutEffect(() => {
        async function getDbCats()
        {
            const cats = await fetchCategories();
            setDbInitialized(true);
        }

        if(!CATEGORIES.length)
            getDbCats();
        else
            setDbInitialized(true);
    }, null);

    if (!dbInitialized)
    {
        return <ActivityIndicator size="large" />;
    }

    function updateCatName(data) {
        changeCategoryName(data);
    }

    function hideUpdateModal() {
        setSelectedCategory({ id: 0 });
    }

    function hideRemoveModal() {
        setShowDelete(false);
    }
    /****************send To Server ********* */
    function removeCategoryHandler()
    {
        removeCategories(selectedCategory.id);
    }

    function updateCatNameHandler()
    {
        updateCategories({ id: selectedCategory.id, title: updatedCatName });
        hideUpdateModal();
    }

    function renderCategoryItem(itemData)
    {
        function pressHandler() {
            navigation.navigate('ProductListScreen', {
                title: "Product List",
                categoryId: itemData.item.id,
                categoryName: itemData.item.title
            });
        }
      
        function longPressHandler(item) {
            setSelectedCategory(item);
            changeCategoryName(item.title)
        }

        return (
            <CategoryGridTile
                title={itemData.item.title}
                id={itemData.item.id}
                more_info={itemData.item.other_info}
                onPress={pressHandler}
                onLongPress={() => longPressHandler(itemData.item)}
            />
        );
    }
    
  return (
    <>
        <AModal
              title="Edit Categoty"
              body={
                <> 
                    <Text>You may Edit Category Here</Text>
                    <FormInputItem
                        value={updatedCatName}
                        label="Name To Change"
                        placeholder="Category Name"
                        error=""                          
                        onChangeText={updateCatName}
                    >
                    </FormInputItem>
                    <View>
                        <IconButton
                            icon="trash"
                            size={24}
                            color="red"
                            onPress={()=> setShowDelete(true)}
                        />
                    </View>
                </>     
              }
              onSubmit={ updateCatNameHandler }
              onCancle={hideUpdateModal}
              modalVisible={selectedCategory.id !==0}
              cancleText="Cancle"
              submitText="Confirm Update"
          />
          <AModal
              title="Warning!!"
              body={
                <> 
                    <Text>Are You Sure You Want to Delete This Category ()?</Text>
                    <TextInput
                        value={updatedCatName}
                        onChangeText={updateCatName}
                    >                      
                    </TextInput>
                </>     
              }
              onSubmit={ removeCategoryHandler }
              onCancle={hideRemoveModal}
              modalVisible={showDelete}
              cancleText="Cancle"
              submitText="Confirm Delete"
          />
        <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={1}
        />
    </>
  );
}

export default CategoryScreen;

const styles = StyleSheet.create({
  divider:{
    width:"100%",
    height:1,
    backgroundColor:"lightgray"
  },
});
