import React from 'react'
import { createRoot } from 'react-dom/client'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'

const App = () => {
    return (
        <div>
            <Router>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <App/>
)