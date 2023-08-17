import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Products() {
  const [products, setProducts] = useState([]);

  const productsURL = `http://localhost:9000/products`;

  async function getAllProducts(productsURL) {
    const allProducts = await fetch(productsURL);
    return setProducts(await allProducts.json());
  }

  useEffect(() => {
    getAllProducts(productsURL);
  }, [productsURL]);

  async function deleteData(productId) {
    const data = await fetch(`${productsURL}/${productId}`, {
      method: "DELETE",
    });
    return await data.json();
  }

  const deleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(productId);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getAllProducts(productsURL);
      }
    });
  };
  return (
    <>
      <h1 className="text-center">Product Page</h1>
      <Link className="btn btn-success mt-3 ms-2" to="/products/add">
        Add New Product
      </Link>
      <table className="table table-striped mt-5">
        <thead>
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((ele) => {
            return (
              <tr key={ele.id}>
                <td className="text-center"> {ele.id} </td>
                <td> {ele.title} </td>
                <td>
                  {ele.description.length > 50
                    ? ele.description.slice(0, 50) + "..."
                    : ele.description}
                </td>
                <td className="text-center"> {ele.price} $ </td>
                <td className="text-center">
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteProduct(ele.id)}
                  >
                    Delete
                  </Link>
                  <Link
                    className="btn btn-info ms-2"
                    to={`/products/details/${ele.id}`}
                  >
                    View
                  </Link>
                  <Link className="btn btn-primary ms-2" to={`edit/${ele.id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
