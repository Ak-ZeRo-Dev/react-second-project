import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductsDetails(props) {
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  const productURL = `http://localhost:9000/products/${productId}`;
  async function getProduct(productURL) {
    const data = await fetch(productURL);
    return setProduct(await data.json());
  }
  useEffect(() => {
    getProduct(productURL);
  }, [productURL]);
  return (
    <>
      <h1 className="text-center"> Product Details</h1>
      <h2> #{product.id} </h2>
      <h3> {product.title} </h3>
      <p> {product.description} </p>
      <h5> {product.price}$ </h5>
    </>
  );
}
