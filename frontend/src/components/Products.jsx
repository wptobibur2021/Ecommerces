import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios"
 
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])
 // console.log(cat, filters, sort)
useEffect(()=>{
    const url = cat ? `http://localhost:8080/api/product/all?category=${cat}` : 'http://localhost:8080/api/product/all'
    console.log("URL: ", url)
    axios.get(url).then(res=>{
      setProducts(res.data)
    })
},[cat])
// Show Product By Filters
useEffect(()=>{
  cat && setFilterProducts(
    products.filter((item)=>Object.entries(filters).every(([key, value])=>item[key].includes(value)))
  )
},[products, cat, filters])
useEffect(()=>{
  if(sort === 'newest'){
    setFilterProducts((prev)=> [...prev].sort((a,b)=> a.createdAt - b.createdAt))
  }else if(sort==="asc"){
    setFilterProducts((prev)=> [...prev].sort((a,b)=>a.price - b.price))
  }else{
    setFilterProducts((prev)=> [...prev].sort((a,b)=>b.price - a.price))
  }
},[sort])
console.log('Product: ', filterProducts)
  return (
    <Container>
      {cat ? filterProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : products?.slice(0, 8).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
