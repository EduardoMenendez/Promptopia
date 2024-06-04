import Link from 'next/link'
import React from 'react'

const Form = ({type, post, setPost, handleSubmit, submitting}) => {
  return (
    <div className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>{type} <span className="blue_gradient">Post</span></h1>
      <p className='desc text-left max-w-md'>{type} and share amazing prompts with the world, and let your imagination run wild with any AI-powerd platform</p>
      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' 
        >
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Your AI prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e)=>{ setPost({...post, prompt: e.target.value})}}
              placeholder='Write your prompt here'
              className='form_textarea '
              />
          </label>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Tag {` `}
              <span className='font-normal'>(#product, #idea, #webdevelopment)</span>
            </span>
            <input
              value={post.tag}
              onChange={(e)=>{ setPost({...post, tag: e.target.value})}}
              placeholder='#tag'
              className='form_input'
              />
          </label>
          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href="/" className='text-gray-500 text-sm'>
                Cancel
            </Link>
            <button
              type='submit'
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
              disabled={submitting}
              >
              {submitting ? `${type}...` : `${type}`}
            </button>
          </div>

      </form>
    </div>
  )
}

export default Form