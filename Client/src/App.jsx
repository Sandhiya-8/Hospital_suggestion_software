import React from "react";
import {useEffect,useState } from "react";
import UserProblem from "./UserProblem";

import HospitalList from "./HospitalList";

function App(){
 
    const [hospital,sethospital]=useState([]);
    const [position,setPosition] = useState({ latitude: null, longitude: null });
    const updatehospital = (data) => {
      sethospital(data);
    };
   

    useEffect(() => {
    
        navigator.geolocation.getCurrentPosition(function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
     
    }, []);
    useEffect(() => {
        const fetchData = async () => {
          if (position.latitude && position.longitude) {
            try {
              const response = await fetch('/gethospitals', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  latitude: position.latitude,
                  longitude: position.longitude
                })
              });
              const data = await response.json();
              console.log(data);
              sethospital(data);
            } catch (error) {
              console.error('There was a problem with the fetch operation:', error);
            }
          }
        };
      
        fetchData();
      }, [position.latitude, position.longitude]);
      
   

    return <div className="App">
    
   
      
      <div className="content"> 
      <UserProblem updatehospital={updatehospital}></UserProblem>

     
      
      <HospitalList data={hospital} />
      
       </div>
    
       
    </div>

}
export default App;