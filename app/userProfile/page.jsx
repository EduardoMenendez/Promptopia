'use client'
import { useSearchParams } from 'next/navigation';
import {useState, useEffect} from 'react';
import Profile from '@components/Profile';

const UserProfile = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const username = searchParams.get('username');

    if(!id) return null;

    const [prompts, setPrompts] = useState([]);

    const getPrompts = async ()=>{
        const data = await fetch(`/api/users/${id}`);
        const promptsFetch = await data.json();

        setPrompts(promptsFetch)
    }

    useEffect(()=>{
        getPrompts();
        console.log("This are the prompts of the user: "+prompts);
    }, [id]);

    return (
        <Profile
            name={username}
            desc="Welcome to my profile!"
            data={prompts}
        />
    );
    
};

export default UserProfile;