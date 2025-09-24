import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children, showSidebar = true }) => {
    return (
        <div className="flex h-screen bg-base-100">
            {showSidebar && <Sidebar />}
            <main className="flex-1 overflow-auto">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
