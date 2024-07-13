import React, { useState, useEffect } from 'react';
import httpclient from '../../services/httpclient';
import Button from '../../Components/button/button';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const { data } = await httpclient().get('/api/category');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div>
            <div className='page_title'>
                Welcome to the Myntra Community!
            </div>
        
            {/* <div className='list'>
                {categories.map((category,number)=>(
                    <div className='list_item'>
                        <Link to={`/category/${category.id}`} className='list_link'>
                            {category.name}
                        </Link>
                    </div>
                ))}
            </div> */}


            <div className='category-list'>
                {categories.map((category) => (
                    <div key={category._id} className='category-item'>
                        <h2>{category.name}</h2>
                        <p>Posted by: {category.user?.username || 'Anonymous'}</p> {/* Display the username */}
                    </div>
                ))}
            </div>



            
            <Link to="/category/create" className="mb-1">create a post</Link>
        </div>
    );
};

export default Home;
