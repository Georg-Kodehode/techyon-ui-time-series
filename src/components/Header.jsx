import { useState } from "react";
import NavItem from "./NavItem";
import barsSolid from "../icons/barsSolid.svg";
import xmarkSolid from "../icons/xmarkSolid.svg";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * toggle the visibility of the hamburger menu on smaller screen sizes on click. The
   * svg icon switches based on whether the menu is visible or not.
   */
  function handleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <div className="header">
      <div className="header-wrapper">
        <p className="logo">Techyon</p>
        <ul className={`nav ${isVisible ? "nav-menu-visible" : ""}`}>
          <NavItem to="*">Dag</NavItem>
          <NavItem to="one-meter-week">Uke</NavItem>
          <NavItem to="all-meters-week">Totalt</NavItem>
          <NavItem to="each-meter-week">Målere</NavItem>
        </ul>
        <button className="menu" onClick={handleVisibility}>
          {!isVisible && <img src={barsSolid} alt="menu" />}
          {isVisible && <img src={xmarkSolid} alt="menu" />}
        </button>
      </div>
    </div>
  );
}
