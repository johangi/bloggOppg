import { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BlogForm = () => {
    const { dispatch } = useBlogsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    // const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const author = user.username;
        const blog = { title, text, author };

        const response = await fetch('/api/blogs/', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        console.log(json);

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('');
            setText('');
            // setAuthor('');
            setError(null);
            setEmptyFields([])
            console.log('new blog added', json);
            dispatch({ type: 'CREATE_BLOG', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new blog</h3>
            <label>Blog Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''} />
            <label>Text:</label>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className={emptyFields.includes('text') ? 'error' : ''} />
            {/* <label>Author:</label>
            <input type="text" onChange={(e) => setAuthor(e.target.value)} value={author} className={emptyFields.includes('author') ? 'error' : ''} /> */}
            <button>Add Blog</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default BlogForm;