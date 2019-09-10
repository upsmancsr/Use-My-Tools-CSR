import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import LogoutButton from '../LogoutButton';
import NavNonAuth from './NavNonAuth';
import MobileNavMenu from './MobileNavMenu';
import "./css/NavigationBar.css";

const NavigationBar = props => (
    <div>{props.authUser ? <NavigationAuth /> : <NavNonAuth />}</div>
);

const NavigationAuth = () => (
    <header className="nav-container">
        <h1 className="logo">Use My Tools</h1>
        <div className="nav-link-container-auth">
            <NavLink to="/findtools" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Find Tools
            </NavLink>

            <NavLink to="/addtool" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Add a tool
            </NavLink>

            <NavLink to="/ownerdashboard" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Owner Dashboard
            </NavLink>
            <NavLink to="/renterdashboard" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Renter Dashboard
            </NavLink>

            <NavLink to="/chat" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Messages
            </NavLink>
        
            <NavLink to="/accountpage" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Account
            </NavLink>
            <LogoutButton className="nav-link-auth" />
        </div>
        <MobileNavMenu />
    </header>
);

const NavigationNonAuth = () => (
    <div className="nav-container">
        <h1 className="logo">Use My Tools</h1>
        <div className="nav-link-container-non-auth">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/register" className="nav-link">
                Sign Up
            </NavLink>
            <NavLink to="/login" className="nav-link">
                Sign In
            </NavLink>
        </div>
    </div>
);

export default withRouter(NavigationBar);

// class NavigationBar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null,
//             showNavLinks: true
//         };
//     }

//     toggleShowNavLinks = event => {
//         const style = (this.state.showNavLinks === true) ? false : true;
//         this.setState({ showNavLinks: style });
//     }

//     render() {
//         return (
            
//             <header className="nav-container">
//                 <h1 className="logo">Use My Tools</h1>
//                 {/* <button className="nav-menu-btn" onClick={this.toggleShowNavLinks}>
//                     Menu
//                 </button> */}
//                 <div className="nav-link-container">
                    
//                     <NavLink to="/findtools" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Find Tools
//                     </NavLink>

//                     <NavLink to="/addtool" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Add a tool
//                     </NavLink>

//                     <NavLink to="/ownerdashboard" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Owner Dashboard
//                     </NavLink>

//                     <NavLink to="/renterdashboard" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Renter Dashboard
//                     </NavLink>

//                     <NavLink to="/chat" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Messages
//                     </NavLink>
                    
//                     <NavLink to="/accountpage" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Account
//                     </NavLink>
//                     <LogoutButton className="nav-link" />
//                 </div>
//             </header>


//         );
//     }
// }