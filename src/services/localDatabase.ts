import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

let db: SQLite.SQLiteDatabase | null = null;

// Abre o banco de dados (chamado internamente)
const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('nutriscan.db');
  }
  return db;
};

// Configuração inicial: cria tabela se não existir
export const setupLocalDatabase = async () => {
  const database = await openDatabase();
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS custom_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        product_name TEXT NOT NULL,
        brands TEXT,
        image_url TEXT,
        ingredients_text TEXT,
        nutriscore_grade TEXT
      );
    `);
    console.log('📦 Banco de dados local pronto!');
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  }
};

// Salva um produto no banco (substitui se já existir)
export const saveProductLocally = async (product: any) => {
  const database = await openDatabase();
  try {
    await database.runAsync(
      `INSERT OR REPLACE INTO custom_products (code, product_name, brands, image_url, ingredients_text, nutriscore_grade) 
       VALUES (?, ?, ?, ?, ?, ?);`,
      product.code,
      product.product_name,
      product.brands || null,
      product.image_url || null,
      product.ingredients_text || null,
      product.nutriscore_grade || null
    );
    console.log(`✅ Produto ${product.code} salvo localmente!`);
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
  }
};

// Busca um produto pelo código de barras
export const getLocalProduct = async (code: string) => {
  const database = await openDatabase();
  try {
    const result = await database.getFirstAsync('SELECT * FROM custom_products WHERE code = ?;', code);
    return result;
  } catch (error) {
    console.error('Erro ao buscar produto local:', error);
    return null;
  }
};

// Popula o banco a partir de um arquivo JSON (assets/products.json)
export const populateDatabaseFromJson = async () => {
  const database = await openDatabase();
  try {
    // Carrega o JSON da pasta assets
    const asset = Asset.fromModule(require('../../assets/products.json'));
    await asset.downloadAsync();
    const response = await fetch(asset.localUri!);
    const products = await response.json();

    for (const product of products) {
      await database.runAsync(
        `INSERT OR REPLACE INTO custom_products (code, product_name, brands, image_url, ingredients_text, nutriscore_grade) 
         VALUES (?, ?, ?, ?, ?, ?);`,
        product.code,
        product.product_name,
        product.brands || null,
        product.image_url || null,
        product.ingredients_text || null,
        product.nutriscore_grade || null
      );
    }
    console.log(`📦 Banco populado com ${products.length} produtos.`);
  } catch (error) {
    console.error('Erro ao popular banco:', error);
  }
};