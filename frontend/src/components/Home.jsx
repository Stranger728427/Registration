import React, { useState } from "react";

const Home = () => {
  const [input, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
  });

  const handleInput = (e) => {

    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    }

  return (
    <>
      <div className="formContainer" style={{ padding: "20px", maxWidth: "400px", margin: "auto", marginTop:"100px" }} >
        <marquee behavior="scroll" direction="left" style={{fontSize:"50px", marginBottom:"40px"}}>Save user Records</marquee>
        <form action="" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Enter Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={input.name}
            onChange={handleInput}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        
          />

          <label>Enter Your Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={input.email}
            onChange={handleInput}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        
          />
          <label>Enter Phone-no</label>
          <input
            type="text"
            placeholder="Phone-no"
            name="phone"
            value={input.phone}
            onChange={handleInput}

            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        
          />
          <label>Enter Postal Code</label>
          <input
            type="text"
            placeholder="Enter Postal Code"
            name="postalCode"
            value={input.postalCode}
            onChange={handleInput}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        

          <button type="submit" style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}>save</button>
        </form>
      </div>
    </>
  );
};

export default Home;
