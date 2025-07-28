import React from "react";
import App from "./App";
import Home from "./Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function Routing()
{

    return <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/hospital-finder" element={<App/>}></Route>
     </Routes>

    </BrowserRouter>
}
export default Routing;