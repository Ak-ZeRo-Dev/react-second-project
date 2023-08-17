import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [title, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  let navigate = useNavigate();
  const addURL = `http://localhost:9000/products`;
  async function addProduct(data, addURL) {
    try {
      const response = await fetch(addURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const forSubmit = (e) => {
    e.preventDefault();
    addProduct(
      {
        title,
        price,
        description,
      },
      addURL
    ).then(() => navigate(`/products`));
  };
  return (
    <>
      <form onSubmit={forSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control w-25"
            id="title"
            placeholder="Name Of Product"
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control w-50"
            id="description"
            rows="3"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control w-25"
            id="price"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-success"
          value="Add Product"
          id="add-product"
        />
      </form>
    </>
  );
}
