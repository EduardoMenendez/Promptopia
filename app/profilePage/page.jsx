'use client'
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile  from '@components/Profile';

const ProfilePage = () => {
  const [prompts, setPrompts] = useState([]);
  const {data: session} = useSession();
  const router = useRouter();

  const fetchPosts = async () =>{
       const res = await fetch(`/api/users/${session?.user.id}`);
       const data = await res.json();
       setPrompts(data);
  }

  useEffect(() =>{
    if(session?.user.id)fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompts/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = prompts.filter((item) => item._id !== post._id);

        setPrompts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile!"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfilePage