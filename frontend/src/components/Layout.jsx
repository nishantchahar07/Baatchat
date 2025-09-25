import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'

const Layout = ({ children, showSidebar = true }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="flex h-screen bg-base-100">
            {/* Desktop Sidebar */}
            {showSidebar && <Sidebar />}

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && showSidebar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute left-0 top-0 h-full w-72 bg-base-100 border-r border-primary/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Sidebar />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Mobile Header */}
                {showSidebar && (
                    <div className="lg:hidden p-4 border-b border-primary/10 bg-base-100/80 backdrop-blur-xl">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                )}

                <div className="p-4 lg:p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
