import React from 'react'
import { createRoot } from 'react-dom/client'
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Linije from './components/linije/Linije'
import EditLinija from './components/linije/EditLinija'

import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { logout } from './services/auth'
import NotFound from './NotFound'
import Login from './authorization/Login'
import { AddLinija } from './components/linije/AddLinija'


const App = () => {

    if(window.localStorage['jwt']){
        return(
        <>
            <Router>
                <Navbar expand bg="dark" variant="dark">
                    <Navbar.Brand style={{marginLeft:10}} as={Link} to='/'>JWD</Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to='/linije'>
                            Linije
                        </Nav.Link>
                        <Button onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/linije' element={<Linije/>} />
                        <Route path="/linije/:id" element={<EditLinija/>}/>
                        <Route path="/linije/dodavanje" element={<AddLinija/>}/>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Container>
            </Router>
        </>
        )
        }else{
            return(
            <>
            <Router>
                <Navbar expand bg="dark" variant="dark">
                    <Navbar.Brand style={{marginLeft:10}} as={Link} to='/'>JWD</Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to='/linije'>
                            Linije
                        </Nav.Link>
                        <Nav.Link as={Link} to='/login'>
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/linije' element={<Linije/>} />
                        <Route path="*" element={<Navigate replace to = "/login" />} />
                    </Routes>
                </Container>
            </Router>
        </>
        )}
    // return (
    //     <div>
    //         <Router>
    //             <ul>
    //                 <li>
    //                     <Link to="/">Home</Link>
    //                 </li>
    //                 <li>
    //                 <Link to="/linije">Linije</Link>
    //                 </li>
    //                 <li>
    //                     <Link to='/linije/dodavanje'>Dodavanje</Link>
    //                 </li>
    //             </ul>
    //             <Routes>
    //                 <Route path="/" element={<Home/>}/>
    //                 <Route path='/linije' element={<Linije/>}/>
    //                 <Route path="/linije/:id" element={<EditLinija/>}/>
    //                 <Route path="/linije/dodavanje" element={<AddLinija/>}/>
    //             </Routes>
    //         </Router>
    //     </div>
    // )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <App/>
)