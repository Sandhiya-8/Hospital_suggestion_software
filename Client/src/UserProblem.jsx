import React, { useState } from "react";

function UserProblem({ updatehospital }) {
  const [formData, setFormData] = useState({
    problem: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const response = await fetch('/tochatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      updatehospital(data);
      // Handle success response
      console.log('Data posted successfully');

                // You can do further processing here
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <a className="navbar-brand">Hospital Suggestion System</a>
      <form onSubmit={e => { e.preventDefault(); }} className="form-inline" style={{ display: "flex" }}>
        <input className="form-control mr-sm-2" type="text" placeholder="Enter your Problem" aria-label="Search" name="problem" value={formData.problem} onChange={handleChange} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={handleClick}>Search</button>
      </form>
    </nav>
  );
}

export default UserProblem;
