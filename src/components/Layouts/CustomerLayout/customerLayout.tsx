import React from 'react'
import CustomerHeader from '../../CustomerHeader/customerHeader'
import Footer from '../../Footer/footer'

interface Props {
    children?: React.ReactNode 
}

export default function CustomerLayout({children} : Props) {
  return (
    <div >
        <CustomerHeader/>
        {children}
        <Footer/>
    </div>
  )
}
