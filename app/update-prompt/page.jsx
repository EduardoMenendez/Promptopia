'use client'
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Form from '@components/form';

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const getPromptDetails = async () => {
        const prompt = await fetch(`/api/prompts/${promptId}`);
        const data = await prompt.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag
        
        });
    };

    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });

    console.log(post);

    useEffect(() =>{
        if(promptId) getPromptDetails();
    }, [promptId]);

    const router = useRouter();

    const updatePost = async(e) => {
        e.preventDefault();
        if(!promptId) return alert('Prompt ID is missing');
        setSubmitting(true);

        try {
            const res = await fetch(`/api/prompts/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
                }),
            });
            if(res.ok){
                router.push('/');
             }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
        
    };
    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            handleSubmit={updatePost}
            submitting={submitting}
        />
    )
}

export default EditPrompt