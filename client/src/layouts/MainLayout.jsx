import React from 'react'
import { Outlet } from 'react-router'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Navbar fixed top */}
      <div className='fixed top-0 left-0 right-0 z-50'><Navbar /></div>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-4 mt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
