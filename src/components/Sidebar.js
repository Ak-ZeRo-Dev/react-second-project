import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <ul className="list-unstyled">
        <li className="mt-3">
          <Link to="/">Home</Link>
        </li>
        <li className="mt-3">
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </>
  );
}
