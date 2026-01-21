import { Product } from '@/data/products';

// Helper function to get translated product title
export function getProductTitle(product: Product, t: (key: string) => string): string {
  return t(product.titleKey) || product.titleKey;
}

// Helper function to get translated product category
export function getProductCategory(product: Product, t: (key: string) => string): string {
  return t(product.categoryKey) || product.categoryKey;
}

// Helper function to get translated product description
export function getProductDescription(product: Product, t: (key: string) => string): string | undefined {
  if (!product.descriptionKey) return undefined;
  return t(product.descriptionKey);
}

// Helper function to get all translated product data
export function getTranslatedProduct(product: Product, t: (key: string) => string) {
  return {
    ...product,
    title: getProductTitle(product, t),
    category: getProductCategory(product, t),
    description: getProductDescription(product, t),
  };
}

