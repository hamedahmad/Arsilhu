import * as SQLite from 'expo-sqlite';

import { Product } from '../models/product';
import { CATEGORIES,SETTINGS } from '../data/reference-data';

const database = SQLite.openDatabase('arsil_shop.db');

export async function removeDatabase() {
    await database.closeAsync();
    await database.deleteAsync();
}

export function initCat() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      await tx.executeSql('CREATE TABLE categories (id INTEGER PRIMARY KEY NOT NULL,title TEXT NOT NULL,image TEXT NOT NULL,other_info TEXT);');

      await tx.executeSql(`INSERT INTO categories(id,title,other_info, image) VALUES 
            (1,'Art and Crafts', '(e.g., paints, canvases, knitting supplies)','art_and_crafts.png'),
            (2,'Automotive', '(e.g., cars, motorcycles, parts and accessories)','automotive.png'),
            (3,'Baby and Toddler', '(e.g., diapers, clothing, toys)','baby_and_toddler.png'),
            (4,'Beauty and Personal Care', '(e.g., skincare, makeup, hair care)','beauty_and_personal_care.png'),
            (5,'Food Services', '(e.g., Sandwitche, Meals, Pizza, Falafel)','food.png'),
            (6,'Books and Office Supplies', '(e.g., books, paper, pens)','books_and_office_supplies.png'),
            (7,'Clothing and Apparel', '(e.g., shirts, pants, dresses)','clothing_and_apparel.png'),
            (8,'Electronics', '(e.g., smartphones, laptops, televisions)','electronics.png'),
            (9,'Garden and Patio', '(e.g., outdoor furniture, grills, gardening supplies)','garden_and_patio.png'),
            (10,'Grocery', '(e.g., food, beverages, snacks)','grocery.png'),
            (11,'Health and Wellness', '(e.g., vitamins, supplements, personal care items)','health_and_wellness.png'),
            (12,'Home and Kitchen', '(e.g., furniture, appliances, cookware)','home_and_kitchen.png'),
            (13,'Jewelry and Watches', '(e.g., rings, necklaces, watches)','jewelry_and_watches.png'),
            (14,'Music and Entertainment', '(e.g., CDs, DVDs, video games)','music_and_entertainment.png'),
            (15,'Pet Supplies', '(e.g., food, toys, grooming items)','pet_supplies.png'),
            (16,'Shoes and Handbags', '(e.g., sneakers, boots, handbags)','shoes_and_handbags.png'),
            (17,'Sports and Outdoors', '(e.g., exercise equipment, camping gear, sports accessories)','sports_and_outdoors.png'),
            (18,'Tools and Home Improvement', '(e.g., power tools, hardware, lighting)','tools_and_home_improvement.png'),
            (19,'Toys and Games', '(e.g., action figures, board games, video games)','toys_and_games.png'),
            (20,'Travel', '(e.g., luggage, travel accessories, maps)','travel.png');`);
    });
      resolve();
  });
  return promise;
}

export function initProdducts() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      await tx.executeSql(
        `CREATE TABLE products (
              id INTEGER PRIMARY KEY NOT NULL,
              title TEXT NOT NULL,
              fragility INTEGER NOT NULL,
              price_sector INTEGER NOT NULL,
              weight INTEGER NOT NULL,
              package_height INTEGER NOT NULL,
              package_width INTEGER NOT NULL,
              package_depth INTEGER NOT NULL,
              online_id INTEGER NULL,
              other_info TEXT);`)
      resolve();
    });
  });
  return promise;
}

export function initCatProd()
{
  const promise = new Promise((resolve, reject) =>
  {
    database.transaction(async (tx) =>
    {
      await tx.executeSql(
        `CREATE TABLE categories_products (id INTEGER PRIMARY KEY NOT NULL,
        catId INT NOT NULL,productId INT NOT NULL,FOREIGN KEY(catId)
        REFERENCES categories(id),FOREIGN KEY(productId) REFERENCES products(id));`)
      resolve();
    })
  });
  return promise;
}

export function initSettings()
{
  const promise = new Promise((resolve, reject) =>
  {
    database.transaction(async (tx) =>
    {
      await tx.executeSql(
        `CREATE TABLE Settings (
          id INTEGER PRIMARY KEY NOT NULL,
          code TEXT NOT NULL,
          title TEXT NOT NULL,
          value TEXT NOT NULL);`);
      
      await tx.executeSql(
        `INSERT INTO Settings (code,title,value) VALUES ('weight','Weight Unit','KG'),('length','Length Unit','Meter');`);      
      resolve();
    })
  });
  return promise;
}

export function initOrders()
{
  const promise = new Promise((resolve, reject) =>
  {
    database.transaction(async (tx) =>
    {
      await tx.executeSql(
        `CREATE TABLE orders (
          id INTEGER PRIMARY KEY NOT NULL,
          code TEXT NOT NULL,
          product_id int NOT NULL,
          quantity int NOT NULL DEFAULT '1',
          from_location TEXT  NOT NULL,
          to_location TEXT NOT NULL,
          points int NOT NULL,
          max_delivery_date_time int NOT NULL,
          current_status TEXT NOT NULL,
          current_location TEXT  NOT NULL,
          delivery_note TEXT  NOT NULL,
          created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          last_update timestamp NULL DEFAULT NULL,
          shop_id int NOT NULL);`
      );    
      resolve();
    })
  });
  return promise;
}

export function addProdTemp() {
  const promise = new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      await tx.executeSql(`INSERT INTO products (title, fragility, price_sector, weight, package_height, package_width, package_depth, other_info) VALUES ('test name', 1, 2, 3, 4, 5, 6, 'rreeww')`);
      resolve();
    });
  });
  return promise;
}

export function insertProductCategories(p_id, categories) {
  const data = [];
  categories.forEach((cat_id) => {
    const val = `(${p_id},${cat_id})`;
    data.push(val);
  })
  const allCatsProds = data.join(',')
  const insertStatement = `INSERT INTO categories_products (productId,catId)  VALUES ${allCatsProds}`;
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(insertStatement, [],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertProduct(product)
{
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO products (
            title,
            fragility,
            price_sector,
            weight,
            package_height,
            package_width,
            package_depth,
            other_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.title,
          product.fragility,
          product.price_sector,
          product.package_weight,
          product.package_height,
          product.package_width,
          product.package_depth,
          product.other_info
        ],
        (_, result) => {
          const newId = result.insertId;
          resolve(newId);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });
  return promise;
}

export function deleteProductCategories(productId)
{
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`DELETE FROM categories_products WHERE productId=?`,[productId],(_, result) => { resolve(); },(_, error) => { reject(error); })
    });
  });
  return promise;
}

export function deleteProduct(productId)
{
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`DELETE FROM products WHERE id=?`,[productId],(_, result) => { resolve(); },(_, error) => { reject(error); })
    });
  });
  return promise;
}

export function updateProducts(product) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE products
           SET title = ?,
            fragility = ?,
            price_sector = ?,
            weight = ?,
            package_height = ?,
            package_width = ?,
            package_depth = ?,
            other_info =  ?
            WHERE id = ?`,
        [
          product.title,
          product.fragility,
          product.price_sector,
          product.package_weight,
          product.package_height,
          product.package_width,
          product.package_depth,
          product.other_info,
          product.id
        ],
        (_, result) => {          
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });
  return promise;
}

export function fetchSettings() {
  const promise = new Promise((resolve, reject) =>
  {
    database.transaction((tx) => {
      tx.executeSql(`SELECT id,code,title,value FROM Settings;`,
        [],
        (_, result) => {
          result.rows._array.forEach((dp) => {
            SETTINGS.push({
              id: dp.id,
              code: dp.code,
              title: dp.title,
              value: dp.value
            });            
          });
          resolve(SETTINGS);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchCategories() {
    const promise = new Promise((resolve, reject) => {      
      database.transaction((tx) =>
      {
        tx.executeSql(`SELECT * FROM categories`,
          [],
          (txObj, resultSet) =>
          {
            for (const dp of resultSet.rows._array)
            {
              const cat = { id: dp.id, name: dp.name, title: dp.title, image: dp.image, other_info: dp.other_info }
              CATEGORIES.push(cat);
            }
            resolve(CATEGORIES);
          },
          (txObj, error) => console.log('Error2', error))
      });
    });
    return promise;  
}

export function fetchAllProducts() {
  const promise = new Promise((resolve, reject) =>
  {
    database.transaction((tx) => {
      tx.executeSql(`SELECT products.id,products.title,fragility,price_sector,weight,package_height,
                package_width,package_depth, products.other_info FROM products`,
        [],
        (_, result) => {
          const products = [];
          result.rows._array.forEach((dp) => {
            products.push({
              id: dp.id, title: dp.title,
              fragility: dp.fragility,
              package_weight: dp.weight,
              price_sector: dp.price_sector,
              package_height: dp.package_height,
              package_width: dp.package_width,
              package_depth: dp.package_depth,
              other_info: dp.other_info
            });            
          });
          resolve(products);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchProducts(catId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT products.id,products.title,fragility,price_sector,
                weight,package_height,package_width,package_depth, products.other_info
                FROM products
                INNER JOIN categories_products ON categories_products.productId = products.id
                INNER JOIN categories ON  categories_products.catId = categories.id
                WHERE categories.id = ?`,[catId],
        (_, result) => {
          const products = [];
          for (const dp of result.rows._array)
          {
            products.push({
              id: dp.id,
              title: dp.title,
              fragility: dp.fragility,
              package_weight: dp.weight,
              price_sector: dp.price_sector,
              package_height: dp.package_height,
              package_width: dp.package_width,
              package_depth: dp.package_depth,
              other_info: dp.other_info
            });
          }
          resolve(products);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchProduct(product_id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT products.id,products.title,fragility,price_sector,
                weight,package_height,package_width,package_depth, products.other_info,
                categories.title AS category_name,catId
                FROM products
                INNER JOIN categories_products ON categories_products.productId = products.id
                INNER JOIN categories ON  categories_products.catId = categories.id
                WHERE products.id = ?`,[product_id],
        (_, result) => {
          const products = [];
          for (const dp of result.rows._array)
          {
            products.push({
              id: dp.id,
              title: dp.title,
              fragility: dp.fragility,
              package_weight: dp.weight,
              price_sector: dp.price_sector,
              package_height: dp.package_height,
              package_width: dp.package_width,
              package_depth: dp.package_depth,
              other_info: dp.other_info,
              category_id: dp.catId,
              category_name: dp.category_name
            });
          }
          resolve(products);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertOrder(order) {
  
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO orders(code, product_id, quantity, from_location, to_location, points, max_delivery_date_time, current_status, current_location, delivery_note) 
         VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        order //[code, product_id, quantity, from_location, to_location, points, max_delivery_date_time, current_status, current_location, delivery_note]
        ,
        (_, result) => {
          const newId = result.insertId;
          resolve(newId);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });
  return promise;
}



export function dropTable(table)
{
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(`Drop Table ${table}`,[],(_, result) => { resolve(); },(_, error) => { reject(error); })
    });
  });
  return promise;
}