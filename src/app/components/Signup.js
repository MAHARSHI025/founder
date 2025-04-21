"use client"
import React, { useState } from 'react'

function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileimage: "",
        gender: "male",
        description: "",
        typeofdate: "relationship",
        hoobies: [],
        addictions: "None",
        age: "",
        city: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                hoobies: checked
                    ? [...prev.hoobies, value]
                    : prev.hoobies.filter((interest) => interest !== value),
            }));
        } else if (name === "age") {
            setFormData((prev) => ({
                ...prev,
                age: parseInt(value, 10), 
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setFormData((prev) => ({
    //         ...prev,
    //         profileimage: file || null
    //     }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log("Submitting Form Data:", formData);
    
        const dataToSend = new FormData();
    
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "hoobies") {
                value.forEach((interest) => dataToSend.append("hoobies[]", interest));
            } else if (key === "age") {
                const ageValue = parseInt(value, 10);
                console.log("none a num");
                if (!isNaN(ageValue)) {
                    dataToSend.append("age", ageValue);
                }
                
            } else {
                if (value !== "") {
                    dataToSend.append(key, value);
                }
            }
        });
    
        fetch("http://localhost:3000/api/users/signup", {
            method: "POST",
            body: dataToSend,
        })
        .then((res) => res.json())
        .then((data) => console.log("Response:", data))
        .catch((err) => console.error("Error:", err));
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="signup-form flex flex-col items-center justify-center border max-w-md mx-auto my-10 p-4 rounded-2xl shadow-lg space-y-4">
                <div className='font-semibold text-2xl'>
                    <h2>Signup</h2>
                </div>
                <div className="signup-input flex flex-col space-y-4">
                    <input type="text" name="username" maxLength="15" placeholder="Username" className="border p-2 rounded-lg" onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" className="border p-2 rounded-lg" onChange={handleChange} />
                    <input type="password" name="password" maxLength="15" placeholder="Password" className="border p-2 rounded-lg" onChange={handleChange} />
                    <input type="password" name="confirmPassword" maxLength="15" placeholder="Confirm Password" className="border p-2 rounded-lg" onChange={handleChange} />

                    <label className="border p-2 rounded-lg w-full flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200">
                        <input type="file" accept="image/png" className="hidden" />
                        <span>{formData.profilePicture ? formData.profilePicture.name : "Upload Profile Picture (PNG)"}</span>
                    </label>

                    <div className="dropdowns flex space-x-4 space-y-1.5 justify-between flex-wrap items-center">
                        <select name="gender" className="bg-neutral-200 text-black p-2 rounded-lg border" onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <select name="typeofdate" className="bg-neutral-200 text-black p-2 rounded-lg border" onChange={handleChange}>
                            <option value="Friends">Friends</option>
                            <option value="Dating">Dating</option>
                            <option value="Relationship">Relationship</option>
                        </select>
                        <select name="addictions" className="bg-neutral-200 text-black p-2 rounded-lg border" onChange={handleChange}>
                            <option value="Smoking">Smoking</option>
                            <option value="Alcohol">Alcohol</option>
                            <option value="Both">Both</option>
                            <option value="None">None</option>
                        </select>
                    </div>

                    <textarea name="description" maxLength="50" placeholder="Description" className="border p-2 rounded-lg" onChange={handleChange}></textarea>

                    <label className='flex items-center space-x-4 justify-center'>
                        <span>{"Please Enter a valid age (16+)"}</span>
                        <input type="number" name="age" min="16" max="80" placeholder="Age" className="w-15 border p-2 rounded-xl" onChange={handleChange} />
                    </label>
                    <label className='flex items-center space-x-4 justify-center'>
                        <span>{"Enter your location"}</span>
                        <input type="text" name="city" maxLength="15" placeholder="City" className="max-w-32 border p-2 rounded-xl" onChange={handleChange} />
                    </label>

                    <div className='tags flex space-x-2 flex-wrap space-y-1.5 max-w-80 items-center'>
                        {["Swimming", "Coding", "Gym", "Travel", "Reading"].map((interest) => (
                            <div key={interest} className="bg-neutral-200 p-1 rounded-xl px-2 space-x-1 flex">
                                <input type="checkbox" id={interest} name="interests" value={interest} onChange={handleChange} />
                                <label htmlFor={interest}>{interest}</label>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="bg-black text-xl text-white p-2 rounded-2xl cursor-pointer mb-2">Signup</button>
                </div>
            </div>
        </form>
    );
}

export default Signup;
