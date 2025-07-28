import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config';

import { GoogleGenerativeAI } from "@google/generative-ai";

import fetch from 'node-fetch'; // npm install node-fetch


const app = express();
const port = 8000;

app.use(bodyParser.json());
 
const API_KEY = process.env.PLACES_API; // Replace 'YOUR_API_KEY' with your actual API key

// Initialize Google Generative AI client (replace with your API key)
const genAI = new GoogleGenerativeAI(process.env.GPT_API);

const position={
    longitude:"",
    latitude:""
}
let hospitaldata=[
  

]



app.post('/gethospitals', async (req, res) => {
    console.log("helo");
    const { latitude, longitude } = req.body;
    position.latitude=latitude;
    position.longitude=longitude;
    console.log(position)
    const response = await fetch(`https://api.geoapify.com/v2/places?categories=healthcare&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=30&apiKey=${API_KEY}`);
    const data = await response.json(); 
    console.log(data);
    for(let i=0;i<data.features.length;i++){
hospitaldata[i]={};
        hospitaldata[i].hospitalname=data.features[i].properties.name;
        hospitaldata[i].postcode=data.features[i].properties.postcode;
        hospitaldata[i].street=data.features[i].properties.street;
        hospitaldata[i].addressline1=data.features[i].properties.address_line1;
        hospitaldata[i].addressline2=data.features[i].properties.address_line2;
        hospitaldata[i].distance=data.features[i].properties.distance;
       
    }
    
      
  
    res.json(hospitaldata);
});
app.post("/tochatgpt", async (req, res) => {
   const prob = req.body.problem;
    console.log(prob);
    console.log("hello");
    let crashed = false;
    let data;
    let prompt = "Give me a specialization for the mentioned problem from the following options that i have mentioned only because I need it to incorporate in my API  :(healthcare.clinic_or_praxis, healthcare.clinic_or_praxis.allergology, healthcare.clinic_or_praxis.vascular_surgery, healthcare.clinic_or_praxis.urology, healthcare.clinic_or_praxis.trauma, healthcare.clinic_or_praxis.rheumatology, healthcare.clinic_or_praxis.radiology, healthcare.clinic_or_praxis.pulmonology, healthcare.clinic_or_praxis.psychiatry, healthcare.clinic_or_praxis.paediatrics, healthcare.clinic_or_praxis.otolaryngology, healthcare.clinic_or_praxis.orthopaedics, healthcare.clinic_or_praxis.ophthalmology, healthcare.clinic_or_praxis.occupational, healthcare.clinic_or_praxis.gynaecology, healthcare.clinic_or_praxis.general, healthcare.clinic_or_praxis.gastroenterology, healthcare.clinic_or_praxis.endocrinology, healthcare.clinic_or_praxis.dermatology, healthcare.clinic_or_praxis.cardiology, healthcare.dentist, healthcare.dentist.orthodontics, healthcare.hospital, healthcare.pharmacy). for example: My probem is leg injury. Your answer should be: healthcare.clinic_or_praxis.orthopaedics please provide the branch of hospital from the given list only not outside from this so Now my problem is:"+prob;
    try {
        // Generate a response from Google Generative AI
       // Call the Google Generative AI model
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    
        let branch = result.response.candidates[0].content.parts[0].text;
        console.log(branch);
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=${branch}&filter=circle:${position.longitude},${position.latitude},10000&bias=proximity:${position.longitude},${position.latitude}&limit=20&apiKey=${API_KEY}`);
       data = await response.json(); 
    }
    catch (error)
    {
        console.log(error);
         console.log("not working chatgpt!!");
        crashed=true
    }


     if(crashed)
        {
            hospitaldata=[];
            console.log("urinary");
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=healthcare&filter=circle:${position.longitude},${position.latitude},10000&bias=proximity:${position.longitude},${position.latitude}&limit=20&apiKey=${API_KEY}`);
       let data = await response.json();
        for(let i=0;i<data.features.length-5;i++){
                    hospitaldata[i]={};
                    hospitaldata[i].hospitalname=data.features[i].properties.name;
                    hospitaldata[i].postcode=data.features[i].properties.postcode;
                    hospitaldata[i].street=data.features[i].properties.street;
                    hospitaldata[i].addressline1=data.features[i].properties.address_line1;
                    hospitaldata[i].addressline2=data.features[i].properties.address_line2;
                    hospitaldata[i].distance=data.features[i].properties.distance;
                   
                }
                console.log(hospitaldata);
        
        }    
      else{
    
        hospitaldata=[];
    for(let i=0;i<data.features.length;i++){
hospitaldata[i]={};
        hospitaldata[i].hospitalname=data.features[i].properties.name;
        hospitaldata[i].postcode=data.features[i].properties.postcode;
        hospitaldata[i].street=data.features[i].properties.street;
        hospitaldata[i].addressline1=data.features[i].properties.address_line1;
        hospitaldata[i].addressline2=data.features[i].properties.address_line2;
        hospitaldata[i].distance=data.features[i].properties.distance;
       
    }}

    
   

    console.log(JSON.stringify(hospitaldata));
    res.json(hospitaldata);
  
  
  
    
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});