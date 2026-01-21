export interface Product {
  id: number;
  titleKey: string; // Translation key for title
  categoryKey: string; // Translation key for category
  image: string;
  tags: string[];
  price?: number;
  descriptionKey?: string; // Translation key for description
}

export const allProducts: Product[] = [
  // Fashion & Clothing
  { 
    id: 1, 
    titleKey: 'product.1.title', 
    categoryKey: 'category.coatsJackets', 
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    tags: ['fashion', 'clothing', 'coats', 'jackets', 'winter', 'saks'],
    price: 299.99,
    descriptionKey: 'product.1.description'
  },
  { 
    id: 2, 
    titleKey: 'product.2.title', 
    categoryKey: 'category.beauty', 
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
    tags: ['beauty', 'makeup', 'cosmetics', 'skincare', 'luxury'],
    price: 45.99,
    descriptionKey: 'product.2.description'
  },
  { 
    id: 3, 
    titleKey: 'product.3.title', 
    categoryKey: 'category.shoes', 
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    tags: ['shoes', 'footwear', 'boots', 'fashion', 'saks'],
    price: 189.99,
    descriptionKey: 'product.3.description'
  },
  { 
    id: 4, 
    titleKey: 'product.4.title', 
    categoryKey: 'category.handbags', 
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
    tags: ['bags', 'handbags', 'accessories', 'luxury', 'saks'],
    price: 399.99,
    descriptionKey: 'product.4.description'
  },
  { 
    id: 5, 
    titleKey: 'product.5.title', 
    categoryKey: 'category.skincare', 
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
    tags: ['beauty', 'skincare', 'luxury', 'cosmetics'],
    price: 89.99
  },
  { 
    id: 6, 
    titleKey: 'product.6.title', 
    categoryKey: 'category.makeup', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    tags: ['beauty', 'makeup', 'cosmetics', 'luxury'],
    price: 55.99
  },
  { 
    id: 7, 
    titleKey: 'product.7.title', 
    categoryKey: 'category.fragrances', 
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    tags: ['beauty', 'fragrance', 'perfume', 'luxury'],
    price: 125.99
  },
  { 
    id: 8, 
    titleKey: 'product.8.title', 
    categoryKey: 'category.newArrivals', 
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
    tags: ['beauty', 'makeup', 'new arrivals', 'luxury'],
    price: 49.99
  },
  { 
    id: 9, 
    titleKey: 'product.9.title', 
    categoryKey: 'category.accessories', 
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=400&h=400&fit=crop',
    tags: ['accessories', 'belts', 'fashion', 'luxury'],
    price: 79.99
  },
  { 
    id: 10, 
    titleKey: 'product.10.title', 
    categoryKey: 'category.bags', 
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop',
    tags: ['bags', 'tote', 'accessories', 'luxury'],
    price: 149.99
  },
  { 
    id: 11, 
    titleKey: 'product.11.title', 
    categoryKey: 'category.clothing', 
    image: 'https://images.unsplash.com/photo-1506629905607-5b0c028a0a0a?w=400&h=400&fit=crop',
    tags: ['clothing', 'fashion', 'luxury', 'pants'],
    price: 199.99
  },
  { 
    id: 12, 
    titleKey: 'product.12.title', 
    categoryKey: 'category.jewelry', 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    tags: ['jewelry', 'earrings', 'accessories', 'luxury'],
    price: 299.99
  },
  
  // Electronics & Computers
  { 
    id: 13, 
    titleKey: 'product.13.title', 
    categoryKey: 'category.computers', 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    tags: ['electronics', 'computers', 'laptops', 'technology', 'best sellers'],
    price: 999.99
  },
  { 
    id: 14, 
    titleKey: 'product.14.title', 
    categoryKey: 'category.accessories', 
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
    tags: ['electronics', 'keyboards', 'computers', 'accessories', 'best sellers'],
    price: 129.99
  },
  { 
    id: 15, 
    titleKey: 'product.15.title', 
    categoryKey: 'category.accessories', 
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    tags: ['electronics', 'mice', 'computers', 'accessories', 'best sellers'],
    price: 49.99
  },
  { 
    id: 16, 
    titleKey: 'product.16.title', 
    categoryKey: 'category.monitors', 
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop',
    tags: ['electronics', 'monitors', 'computers', 'best sellers'],
    price: 399.99
  },
  { 
    id: 17, 
    titleKey: 'product.17.title', 
    categoryKey: 'category.audio', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    tags: ['electronics', 'audio', 'headphones', 'best sellers', 'smart home'],
    price: 199.99
  },
  { 
    id: 18, 
    titleKey: 'product.18.title', 
    categoryKey: 'category.accessories', 
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
    tags: ['electronics', 'webcam', 'computers', 'accessories'],
    price: 79.99
  },
  { 
    id: 19, 
    titleKey: 'product.19.title', 
    categoryKey: 'category.storage', 
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
    tags: ['electronics', 'storage', 'computers', 'accessories'],
    price: 24.99
  },
  
  // Books
  { 
    id: 20, 
    titleKey: 'product.20.title', 
    categoryKey: 'category.books', 
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
    tags: ['books', 'reading', 'best sellers', 'new releases'],
    price: 19.99
  },
  { 
    id: 21, 
    titleKey: 'product.21.title', 
    categoryKey: 'category.books', 
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop',
    tags: ['books', 'reading', 'new releases'],
    price: 24.99
  },
  
  // Medical Care
  { 
    id: 22, 
    titleKey: 'product.22.title', 
    categoryKey: 'category.medical', 
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',
    tags: ['medical', 'health', 'first aid', 'medical care'],
    price: 29.99
  },
  { 
    id: 23, 
    titleKey: 'product.23.title', 
    categoryKey: 'category.medical', 
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop',
    tags: ['medical', 'health', 'monitoring', 'medical care'],
    price: 49.99
  },
  
  // Amazon Basics
  { 
    id: 24, 
    titleKey: 'product.24.title', 
    categoryKey: 'category.electronics', 
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&h=300&fit=crop',
    tags: ['amazon basics', 'electronics', 'batteries'],
    price: 12.99
  },
  { 
    id: 25, 
    titleKey: 'product.25.title', 
    categoryKey: 'category.electronics', 
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
    tags: ['amazon basics', 'electronics', 'cables'],
    price: 9.99
  },
  
  // Smart Home
  { 
    id: 26, 
    titleKey: 'product.26.title', 
    categoryKey: 'category.smartHome', 
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    tags: ['smart home', 'electronics', 'speakers', 'ai'],
    price: 99.99
  },
  { 
    id: 27, 
    titleKey: 'product.27.title', 
    categoryKey: 'category.smartHome', 
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=300&fit=crop',
    tags: ['smart home', 'lighting', 'electronics'],
    price: 24.99
  },
  
  // Gift Cards
  { 
    id: 28, 
    titleKey: 'product.28.title', 
    categoryKey: 'category.giftCards', 
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
    tags: ['gift cards', 'gifts'],
    price: 50.00
  },
  
  // Today's Deals
  { 
    id: 29, 
    titleKey: 'product.29.title', 
    categoryKey: 'category.deals', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    tags: ['deals', 'today\'s deals', 'discount'],
    price: 79.99
  },
  { 
    id: 30, 
    titleKey: 'product.30.title', 
    categoryKey: 'category.deals', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop',
    tags: ['deals', 'today\'s deals', 'discount'],
    price: 39.99
  },
];

export function searchProducts(query: string, category?: string): Product[] {
  const lowerQuery = query.toLowerCase();
  
  return allProducts.filter(product => {
    // Search by category if provided
    if (category && category !== 'All') {
      const categoryLower = category.toLowerCase();
      const categoryMatch = 
        product.categoryKey.toLowerCase().includes(categoryLower) ||
        product.tags.some(tag => tag.toLowerCase() === categoryLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(categoryLower));
      if (!categoryMatch) return false;
    }
    
    // Search by query
    if (!query) return true;
    
    return (
      product.titleKey.toLowerCase().includes(lowerQuery) ||
      product.categoryKey.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      (product.descriptionKey && product.descriptionKey.toLowerCase().includes(lowerQuery))
    );
  });
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(product => {
    const categoryLower = category.toLowerCase();
    return (
      product.categoryKey.toLowerCase().includes(categoryLower) ||
      product.tags.some(tag => tag.toLowerCase() === categoryLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(categoryLower))
    );
  });
}

