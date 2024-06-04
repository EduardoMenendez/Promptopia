'use client'
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, searchText, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        (post.creator.username.includes(searchText) || post.tag.includes(searchText) || post.prompt.includes(searchText)?
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />:null)
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  
  const fetchData = async () => {
    const res = await fetch('/api/prompts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(()=>{
    fetchData();
  }, []);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    return (posts.filter((post)=>(post.creator.username.includes(searchText) || post.tag.includes(searchText) || post.prompt.includes(searchText))));
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    console.log("Tag: "+tag);
  };
  return (
    <section className='feed'>
      <form className="relative w-full flex-center" action="">
          <input 
          type='text' 
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'/>
      </form>
      <PromptCardList 
        searchText={searchText}
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed