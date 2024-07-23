'use client';
import NavBar from "@/components/NavBar";
import ProductList from "@/components/ProductList";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
       <NavBar onSearch={handleSearch}/> 

      <ProductList searchText={searchTerm}/> 
    </div>
  );
}
