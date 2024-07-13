import React, { useState } from 'react';
import Formerror from '../../../formerror/formerror';
import Button from '../../../button/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function(){
    const navigate=useNavigate();
    const [errors,setErrors]=useState([]);
    const [name,setName]=useState('');

    const onSubmit = async event=>{
        event.preventDefault();
        setErrors([]);
        if(!name) return setErrors([`Field can't be empty`]);


        // const response= await axios.post('/api/category/create',data);
        // navigate(`/category/${response.data.id}`);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/category/create', { name },{headers:{Authorization:`Bearer ${token}`}});
            navigate(`/`);
        } catch (error) {
            console.error('Error creating category:', error);
            setErrors([error.response?.data?.message || 'Something went wrong']);
        }
    }
    return(
        <div className='page'>
            <h1 className='page_title'>Create a post</h1>
            <form className='form' onSubmit={onSubmit}>
                {!!errors.length && <Formerror errors={errors}/>}
                <div className='form_group'>
                    <label className='form_label'>
                        Write Something
                    </label>
                    <input className='form_input' type='text' value={name} onChange={e=> setName(e.target.value)} required/>
                
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </div>
    )
}