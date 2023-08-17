import { Outlet, Route, Routes } from "react-router-dom";
import Products from "./components/pages/Products";
import AddProducts from "./components/pages/AddProduct";
import EditProducts from "./components/pages/EditProduct";
import ProductsDetails from "./components/pages/ProductDetails";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
export default function App() {
  return (
    <>
      <Navbar />
      <div className="row w-100">
        <div className="col-2 text-center">
          <Sidebar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Outlet />}>
              <Route path="" element={<Products />} />
              <Route path="add" element={<AddProducts />} />
              <Route path="edit/:productId" element={<EditProducts />} />
              <Route path="details/:productId" element={<ProductsDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
