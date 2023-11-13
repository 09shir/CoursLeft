import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import sfu from '../assets/sfu4.png';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from "../redux/board"


const Header = () => {

    const boardID = useSelector((state) => state.boardCounter.board);
    const dispatch = useDispatch();

    return(
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">
                    <img width='200' height='50' src={sfu} className="d-inline-block align-top" alt="logo"/>
                </Navbar.Brand>
                <Nav expand="lg" className="me-auto"></Nav>
                <Nav expand="lg" className="me-auto"></Nav>
                <Nav expand="lg" className="me-auto"></Nav>
                {boardID === "1" ? 
                    <Nav expand="lg" className="me-3">
                        <Nav.Link onClick={() => {dispatch(setBoard("1"))}}> 
                            <button className="btn btn-secondary">
                                <span className="boardIcon">
                                    <CalendarMonthIcon/>
                                </span>
                                &nbsp;
                                <span className="boardName">
                                    <b>Planner&nbsp;1</b>
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav expand="lg" className="me-3">
                        <Nav.Link onClick={() => {dispatch(setBoard("1"))}}> 
                            <button className="btn">
                                <span className="boardIcon">
                                    <CalendarMonthIcon/>
                                </span>
                                &nbsp;
                                <span className="boardName">
                                    <b>Planner&nbsp;1</b>
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                }
                {boardID === "2" ? 
                    <Nav expand="lg" className="me-3">
                        <Nav.Link onClick={() => {dispatch(setBoard("2"))}}> 
                            <button className="btn btn-secondary">
                                <span className="boardIcon">
                                    <CalendarMonthIcon/>
                                </span>
                                &nbsp;
                                <span className="boardName">
                                    <b>Planner&nbsp;2</b>
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav expand="lg" className="me-3">
                        <Nav.Link onClick={() => {dispatch(setBoard("2"))}}> 
                            <button className="btn">
                                <span className="boardIcon">
                                    <CalendarMonthIcon/>
                                </span>
                                &nbsp;
                                <span className="boardName">
                                    <b>Planner&nbsp;2</b>
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                }
                {boardID === "3" ? 
                    <Nav expand="lg" className="me-3">
                        <Nav.Link onClick={() => {dispatch(setBoard("3"))}}> 
                            <button className="btn btn-secondary">
                                <span className="boardIcon">
                                    <CalendarMonthIcon/>
                                </span>
                                &nbsp;
                                <span className="boardName">
                                    <b>Planner&nbsp;3</b>
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav expand="lg" className="me-3">
                        <Nav.Link onClick={() => {dispatch(setBoard("3"))}}> 
                            <button className="btn">
                                <span className="boardIcon">
                                    <CalendarMonthIcon/>
                                </span>
                                &nbsp;
                                <span className="boardName">
                                    <b>Planner&nbsp;3</b>
                                </span>
                            </button>
                        </Nav.Link>
                    </Nav>
                }
                <Nav expand="lg" className="me-auto"></Nav>
                <Nav expand="lg" className="me-auto"></Nav>
                <Nav expand="lg" className="me-auto"></Nav>
                <Nav expand="lg" className="me-auto">
                    <Nav.Link href="https://www.sfu.ca/" target="_blank">About</Nav.Link>
                    <NavDropdown title="Contact" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="https://www.github.com/09shir" target="_blank">
                            GitHub
                        </NavDropdown.Item>
                        <NavDropdown.Item href="https://www.linkedin.com/in/roy-sh1" target="_blank">
                            LinkedIn
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="mailto: rsa180@sfu.ca" target="_blank">
                            Email
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header