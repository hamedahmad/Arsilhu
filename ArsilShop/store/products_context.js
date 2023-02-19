import { createContext, useState } from 'react';
import { setCategories } from '../util/http';

export const ProductsContext = createContext({
    categories: [],
    products:[],
    addCategory: (category) => {},
    removeCategory: (id) => {},
    addProduct: (product) => {},
    removeProduct: (id) => {},
});

function ProductContextProvider({ children }) {
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    
    function addCategory(category)
    {
        
        setCategoryList((currentList) => [...currentList, category]);
    }
    
    function addProduct(product) {
        setProductList((currentList) => [...currentList, product]);
    }
    
    function removeCategory(id) {
        setCategoryList((currentList) => currentList.filter((catId) => catId !== id));
    }
    
    function removeProduct(id) {
        setCategoryList((currentList) => currentList.filter((prodId) => prodId !== id));
    }

    const value = {
        categories: categoryList,
        products: productList,
        addCategory: addCategory,
        removeCategory: removeCategory,
        addProduct: addProduct,
        removeProduct: removeProduct,
    };

    return (
        <ProductContextProvider.Provider value={value}>
            {children}
        </ProductContextProvider.Provider>
    );
}

export default ProductContextProvider;
