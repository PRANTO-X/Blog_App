import React from 'react'

const Footer = () => {
  return (
    <footer className=" bg-indigo-600 text-white py-6 mt-2.5">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className=" md:text-lg text-center md:text-start">&copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
        <nav className="space-x-4 mt-4 md:mt-0 md:text-lg">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </nav>
    </div>
</footer>

  )
}

export default Footer