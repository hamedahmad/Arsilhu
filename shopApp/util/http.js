import axios from "axios"
import { formatDate } from './date'
import Product from "../models/product";

//const BACKEND_URL = "https://react-course-hamed.firebaseio.com/arsilu_db";
const BACKEND_URL = "https://www.arsilhu.com/api";

export async function setCategories(data) {
    //const response = await axios.post(BACKEND_URL + '/categories.json', {...data,created_at: formatDate(new Date(),'yyyy-dd-mm')});
    const response = await axios.post(BACKEND_URL + '/categories', { ...data });
    const id = response.data.name;
    console.log(id);
    return id;
}

export async function getCategories() {
    const response = await axios.get(BACKEND_URL + '/categories');
    console.log(response);
    const categories = [];

    response.data.result.forEach(element => {
        const catObj = {
            id: element.id,
            title: element.title,
            image: element.image,
            other_info: element.other_info
        };
        categories.push(catObj);
    });

    return categories
}

export async function removeCategories(id)
{
    const response = await axios.delete(`${BACKEND_URL}/${id}.json`);
    console.log(response);
}

export async function updateCategories(data)
{
    const response = await axios.put(`${BACKEND_URL}/${data.id}.json`, data);
    console.log(response);
}

export function getProducts(cat_id) {
    const promise = new Promise((resolve, reject) => {
        axios.get(BACKEND_URL + '/products.json', { cat_id: cat_id }).then((response) => {
            const products = [];
            for (const key in response.data) {
                const data = response.data[key];
                const prodObj = new Product(
                    data.id,
                    data.title,
                    data.fragility,
                    data.package_weight,
                    data.price_sector,
                    data.package_height,
                    data.package_width,
                    data.package_depth,
                    data.other_info,
                    data.categories
                );
                products.push(prodObj);
            }
            resolve(products);
        })
    });
    return promise;
}

export async function searchProduct( productSearchName)
{
    const response = await axios.get(BACKEND_URL + '/searchProduct/name/'+productSearchName);
    console.log(response);
}

export async function searchServer(table, productSearchName)
{
    const response = await axios.get(BACKEND_URL + '/searchProduct/name/'+productSearchName);
    console.log(response);
}