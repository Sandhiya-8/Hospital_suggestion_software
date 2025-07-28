import React from 'react';

// Card component
const Card = ({ hospital }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{hospital.hospitalname}</h2>
      </div>
      <div className="card-body">
        <p><strong>Postcode:</strong> {hospital.postcode}</p>
        <p><strong>Street:</strong> {hospital.street}</p>
        <p><strong>Address Line 1:</strong> {hospital.addressline1}</p>
        <p><strong>Address Line 2:</strong> {hospital.addressline2}</p>
        <p><strong>Distance:</strong> {hospital.distance}</p>
      </div>
    </div>
  );
};

// Main component
const HospitalList = ({ data }) => {
  return (
    <div className="hospital-list">
      {data.map((hospital, index) => (
        <Card key={index} hospital={hospital} />
      ))}
    </div>
  );
};

export default HospitalList;
