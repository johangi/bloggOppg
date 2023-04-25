import { useBlogsContext } from '../hooks/useBlogsContext';
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BlogDetails = ({ blog }) => {
    const { dispatch } = useBlogsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/blogs/' + blog._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_BLOG', payload: json })
        }
    }
    
    return (
        <div className="workout-details">
            <h4>{blog.title}</h4>
            <p><strong>Text: </strong>{blog.text}</p>
            <p><strong>Author: </strong>{blog.author}</p>
            <p>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default BlogDetails;