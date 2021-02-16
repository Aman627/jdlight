import React from 'react';
import './Categories.css';
import {NavLink} from 'react-router-dom';
import Nav from '../Navigation/Nav';
import Container from 'react-bootstrap/Container';
import Footer from '../Footer/Footer';

class Categories extends React.Component{
    render(){
        return(
            <>
                <Nav/>
                <Container fluid className="px-5 py-3">
                    <h1 className="Raleway display-4">Categories</h1>
                    <div className="F_Container d-flex flex-wrap justify-content-center">
                        <div className="F_Item">
                            <NavLink exact to="/Products">
                                <h2>LED Bulb</h2>
                            </NavLink>
                        </div>
                        <div className="F_Item">
                            <NavLink exact to="/Products">
                                <h2>Tubelights</h2>
                            </NavLink>
                        </div>
                        <div className="F_Item">
                            <NavLink exact to="/Products">
                                <h2>Halogens</h2>
                            </NavLink>
                        </div>
                        <div className="F_Item">
                            <NavLink exact to="/Products">
                                <h2>Lamps</h2>
                            </NavLink>
                        </div>
                    </div>
                </Container>
                <Footer/>
            </>
        )
    }
}

export default Categories;