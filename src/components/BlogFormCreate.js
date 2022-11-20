const BlogFormCreate = ({title, author, url, handleChangeTitle, handleChangeAuthor, handleChangeUrl, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div>
        title: <input value={title} onChange={handleChangeTitle}/>
        </div>
        <div>
        author: <input value={author} onChange={handleChangeAuthor}/>
        </div>
        <div>
        url: <input value={url} onChange={handleChangeUrl}/>
        </div>
        <div>
        <button type="submit">Create Post</button>
        </div>
    </form> 
  )
  
export default BlogFormCreate