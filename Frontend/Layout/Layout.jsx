import Header from "../src/component/Header/Header";

import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Header/>
        <Outlet/>  {/* ← nested child components render here */}
    </>
  )
}

export default Layout