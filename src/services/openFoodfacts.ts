// src/services/openFoodFacts.ts
import { Product } from '../types/products';
import { getLocalProduct, saveProductLocally } from './localDatabase';

export async function getProductByBarcode(barcode: string): Promise<Product | null> {
  // 1. Primeiro, busca no banco de dados local
  const localProduct = await getLocalProduct(barcode) as Product | null;
  if (localProduct) {
    console.log(`✅ Produto ${barcode} encontrado no banco local.`);
    // Converte o formato do banco (pode ter campos extras) para Product
    return {
      code: localProduct.code,
      product_name: localProduct.product_name,
      brands: localProduct.brands,
      image_url: localProduct.image_url,
      ingredients_text: localProduct.ingredients_text,
      nutriscore_grade: localProduct.nutriscore_grade,
    };
  }

  // 2. Se não encontrou, busca na API pública
  try {
    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);
    const data = await response.json();

    if (data.status === 1) {
      const p = data.product;
      const product: Product = {
        code: barcode,
        product_name: p.product_name || 'Nome não disponível',
        brands: p.brands || 'Marca não informada',
        image_url: p.image_url,
        ingredients_text: p.ingredients_text,
        nutriscore_grade: p.nutriscore_grade,
      };

      // 3. Salva uma cópia no banco local para próximas consultas
      await saveProductLocally(product);
      console.log(`💾 Produto ${barcode} salvo no banco local.`);

      return product;
    }

    // 4. Produto não encontrado nem local nem na API
    console.warn(`⚠️ Produto ${barcode} não encontrado em lugar nenhum.`);
    return null;
  } catch (error) {
    console.error(`❌ Erro na API ao buscar ${barcode}:`, error);
    return null;
  }
}