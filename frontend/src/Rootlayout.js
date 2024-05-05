import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function Rootlayout() {
    return (
        <div>
            <Header />
            <div style={{ minHeight: '79vh' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Rootlayout