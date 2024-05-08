import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-indigo-500 px-7 py-2 rounded-md">
    {children}
  </Link>
);
