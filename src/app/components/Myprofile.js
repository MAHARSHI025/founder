"use client"
import { signOut } from 'next-auth/react';
import React, { useState } from 'react'
import Preview from './Preview';
import Profileimage from './Profieimage';

function Myprofile() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male",
        description: "",
        typeofdate: "relationship",
        hoobies: [],
        addictions: "None",
        age: "",
        city: "",
    });
    const [render, setrender] = useState("edit")

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

        fetch("/api/users/signup", {
            method: "POST",
            body: dataToSend,
        })
            .then((res) => res.json())
            .then((data) => console.log("Response:", data))
            .catch((err) => console.error("Error:", err));
    };

    if (render === "preview") {
        return(
            <div className=''>
                <Preview onClose={() => setrender("edit")}/>
            </div>
        )
    }
    if (render === "profileimage") {
        return(
            <div className=''>
                <Profileimage onClose={() => setrender("edit")}/>
            </div>
        )
    }


    return (
        <form onSubmit={handleSubmit} >
            <div className="drop-shadow-sm signup-form flex flex-col items-center justify-center border max-w-md mx-auto mt-80 mb-2 p-4 rounded-2xl shadow-lg space-y-4">
                <div className='font-semibold text-2xl flex justify-between w-full'>
                    <h2>Edit Profile</h2>
                    <div className='flex gap-2'>

                        <div className="flex cursor-pointer text-nowrap py-1 px-3 text-lg rounded-xl gap-2 items-center justify-between  text-black border-black border">
                            <button className='text-center text-xs cursor-pointer' onClick={()=> setrender("preview")}>Preview</button>
                        </div>
                        <div className="flex cursor-pointer text-nowrap py-1 px-3 text-lg rounded-xl gap-2 items-center justify-between bg-red-600 text-white border-black border">
                            <button className='text-center text-xs cursor-pointer' onClick={() => signOut()}>Log out</button>
                        </div>
                    </div>
                </div>
                <div className="signup-input flex flex-col space-y-4 ">
                    <input type="text" name="username" maxLength="15" placeholder="Username" className="border p-2 rounded-lg" onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" className="border p-2 rounded-lg" onChange={handleChange} />
                    <input type="password" name="password" maxLength="15" placeholder="Password" className="border p-2 rounded-lg" onChange={handleChange} />
                    <input type="password" name="confirmPassword" maxLength="15" placeholder="Confirm Password" className="border p-2 rounded-lg" onChange={handleChange} />

                    <label className="border p-2 rounded-lg w-full flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200">
                        <span onClick={()=> setrender("profileimage")}>{"Upload Profile Picture (PNG)"}</span>
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
                        <span>{"Please enter your age"}</span>
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

                    <button type="submit" className="bg-black text-xl text-white p-2 rounded-2xl cursor-pointer mb-2">Confirm</button>
                </div>
            </div>
        </form>
    );
}

export default Myprofile;
