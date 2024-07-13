import React, { useContext, useState } from "react";
import FormErrors from "../../formerror/formerror";
import Button from "../../button/button"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import AppContext from "../../../Context/appcontext";
import httpclient from "../../../services/httpclient";

const Register=()=>{
    const navigate=useNavigate();
    const {setUser} = useContext(AppContext);
    const [errors,setErrors]=useState([]);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const onSubmit=async event=>{
        event.preventDefault();
        console.log('login Form submitted');
        setErrors([]);
        let _errors=[];

        if(!email) _errors.push('email is required');
        if(!password) _errors.push('password is required');
        
        if(_errors.length) return setErrors(_errors);


        try{
            const data={
                email,
                password
            }
    
            const response=await axios.post('/api/user/login',data);
            setUser(response.data.user);
            localStorage.setItem("token",response.data.token);
            navigate('/');
        }catch(e){
            console.error('Login error:', e.response ? e.response.data : e.message);
            setErrors([e.response.data.message])
        }
    };

    return(
        <div className="page">
            <h1 className="page_title">
                Login
            </h1>

            <form onSubmit={onSubmit} className="form">
                {!!errors.length && <FormErrors errors={errors}/>}
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
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}

export default Register;