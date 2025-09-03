import Header from "../src/component/Header/Header";
import Footer from "../src/component/Footer/Footer";

import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Header/>
        <Outlet/>  {/* ← nested child components render here */}
        <Footer/>
    </>
  )
}

export default Layout
