import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2";

export default function EditProducts() {
  const [title, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  let { productId } = useParams();
  let navigate = useNavigate();
  const editURL = `http://localhost:9000/products/${productId}`;

  async function addProduct(data, editURL) {
    try {
      const response = await fetch(editURL, {
        method: "PUT",
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

  const deleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        addProduct(
          {
            title,
            price,
            description,
          },
          editURL
        ).then(() => navigate(`/products`));
        Swal.fire("Edited!", "Your file has been edited.", "success");
      }
    });
  };
  const forSubmit = (e) => {
    e.preventDefault();
    deleteProduct();
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
          value="Edit Product"
          id="edit-product"
        />
      </form>
    </>
  );
}
