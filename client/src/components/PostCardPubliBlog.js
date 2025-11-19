import React from 'react'
import PubliBlogHeader from './PubliBlogHeader'
import PubliBlogBody from './PubliBlogBody'
import PubliBlogFooter from './PubliBlogFooter'
import PubliBlogComments from './PubliBlogComments'

const PostCardPubliBlog = ({ post, theme }) => {
  return (
    <div className="card my-3 publi-blog-card">
      <PubliBlogHeader post={post} />
      <PubliBlogBody post={post} theme={theme} />
      <PubliBlogFooter post={post} />
      <PubliBlogComments post={post} />
    </div>
  )
}

export default PostCardPubliBlog
