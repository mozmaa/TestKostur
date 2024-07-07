import React from 'react'
import { createRoot } from 'react-dom/client'
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { logout } from './services/auth'
import NotFound from './NotFound'
import Login from './authorization/Login'



const App = () => {

    if(window.localStorage['jwt']){
        return(
        <>
            <Router>
                <Navbar expand bg="dark" variant="dark">
                    <Navbar.Brand style={{marginLeft:10}} as={Link} to='/'>JWD</Navbar.Brand>
                    <Nav>
                        <Button onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
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
                        <Nav.Link as={Link} to='/login'>
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path="*" element={<Navigate replace to = "/login" />} />
                    </Routes>
                </Container>
            </Router>
        </>
        )}
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <App/>
)