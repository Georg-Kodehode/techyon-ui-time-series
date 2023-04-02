import { NavLink } from "react-router-dom";

/**
 * styling for currently clicked link
 */
const activeStyle = {
  borderBottom: "3px solid rgb(145, 145, 255)",
  color: "rgb(145, 145, 255)",
};

export default function NavItem(props) {
  const { to, children } = props;
  return (
    <li>
      <NavLink
        to={to}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        {children}
      </NavLink>
    </li>
  );
}
