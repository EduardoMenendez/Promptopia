'use client'
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Form from '@components/form';

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });
    const router = useRouter();
    const {data: session} = useSession();

    const createPost = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/prompts/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })

            
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
            type="Create"
            post={post}
            setPost={setPost}
            handleSubmit={createPost}
            submitting={submitting}
        />
    )
}

export default CreatePrompt