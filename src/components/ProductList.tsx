'use client'
import { useCart } from '@/context/CartcontextProvider';
import { Product } from '@/types/Product';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from "./Card"

interface ProductListProps {
    searchText: string;
}

const ProductList = ({searchText} : ProductListProps) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const resp = await axios.get('/api/get-product');
      console.log(resp.data.data)
      setProducts(resp.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category && product.category.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(filtered);
      };
    filterProducts();
  }, [searchText, products]);

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
      {
        filteredProducts.map((product)=>{
            return <Card product={product} key={product.id}/>
        })
      }
    </div>
  );
}

export default ProductList