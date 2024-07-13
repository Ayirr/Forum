import React, { useState } from "react";
import FormErrors from "../../formerror/formerror";
import validator from "validator";
import Button from "../../button/button"
import "../../form/form.css"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import httpclient from "../../../services/httpclient";

const Register=()=>{
    const navigate=useNavigate();
    const [errors,setErrors]=useState([]);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [passwordAgain,setPasswordAgain]=useState("");

    const onSubmit=async event=>{
        event.preventDefault();
        console.log('Form submitted'); 
        setErrors([]);
        let _errors=[];

        if(!name) _errors.push('name is required');
        if(!validator.isEmail(email)) _errors.push('email is required');
        if(!password) _errors.push('password is required');
        if(!passwordAgain) _errors.push('re-enter password');
        if(password!==passwordAgain) _errors.push('passwords must match');
        
        if(_errors.length) return setErrors(_errors);

        const data={
            name,
            email,
            password
        }


    console.log('Registering user with data:', data);

        try{
            await axios.post('/api/user/register',data);
            navigate('/auth/login');
        }catch(e){
            console.error('Registration error:', e.response ? e.response.data : e.message);
            setErrors([e.response.data.message])
        }
    };

    return(
        <div className="page">
            <h1 className="page_title">
                Register
            </h1>

            <form onSubmit={onSubmit} className="form">
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form_group">
                    <label className="form_label">Name</label>
                    <input type="text" className="form_input" 
                            value={name} 
                            onChange={e=> setName(e.target.value)}/>
                </div>
                <div className="form_group">
                    <label className="form_label">Email</label>
                    <input type="text" className="form_input" 
                            value={email} 
                            onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div className="form_group">
                    <label className="form_label">Password</label>
                    <input type="password" className="form_input" 
                            value={password} 
                            onChange={e=> setPassword(e.target.value)}/>
                </div>
                <div className="form_group">
                    <label className="form_label">Re-enter Password</label>
                    <input type="password" className="form_input" 
                            value={passwordAgain} 
                            onChange={e=> setPasswordAgain(e.target.value)}/>
                </div>
                <Button type="submit">Register</Button>
            </form>
        </div>
    )
}

export default Register;