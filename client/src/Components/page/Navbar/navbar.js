import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../../images/image.png";  // Correct relative path
import AppContext from "../../../Context/appcontext";

export default function Navbar() {
    const {logout,user}=useContext(AppContext);
    return (
        <div className="navbar">
            <img src={Logo} className="navbar_logo" alt="logo" />

            <ul className="navbar_list">
                <li className="navbar_item">
                    <Link to="/" className="navbar_link">Home</Link>
                </li>
                {!user ? <li className="navbar_item navbar_submenu-container">
                    <button className="navbar_link">Account</button>
                    <ul className="navbar_submenu">
                        <li className="navbar_submenu-item">
                            <Link to="/auth/login" className="navbar_submenu-link">Login</Link>
                        </li>
                        <li className="navbar_submenu-item">
                            <Link to="/auth/register" className="navbar_submenu-link">Register</Link>
                        </li>
                    </ul>
                </li>: (
                    <li className="navbar_item navbar_submenu-container">
                    <button className="navbar_link">{user.name}</button>
                    <ul className="navbar_submenu">
                        <li className="navbar_submenu-item">
                            <Link to="/profile" className="navbar_submenu-link">Profile</Link>
                        </li>
                        <li className="navbar_submenu-item">
                            <button onClick={logout}
                                className="navbar_submenu-link">Logout</button>
                        </li>
                    </ul>
                </li>
                )}
            </ul>
        </div>
    );
}
