import React from "react";
import "./home.css";
function Home()
{
    return<div className="home">
    <div className="left">
     <h1>
     A world of healthcare at your fingertips
     </h1>
     <a href="/hospital-finder">
     <button><span>Get started </span><span style={{marginLeft:"10px"}}>></span> </button>
     </a>
    </div>
    <div className="right">
    <img src="https://nowpatient.com/_next/image?url=https%3A%2F%2Fnpcms.nowpatient.com%2Fwp-content%2Fuploads%2F2024%2F04%2Fhero-updated-1.webp&w=1920&q=100"></img>
    </div>
    </div>
}
export default Home;