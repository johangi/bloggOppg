import { useBlogsContext } from "../hooks/useBlogsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetBlogs } from "../hooks/useGetBlogs";

import BlogDetails from '../components/BlogDetails';
import { useEffect } from "react";

const Blogs = () => {
    const { user } = useAuthContext();
    const { blogs } = useBlogsContext();
    const { getBlogs } = useGetBlogs();
    const author = 'maxepusen';

    const loadBlogs = async e => {
        await getBlogs(user, author)
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore) loadBlogs()
        return () => { ignore = true; }
    }, []);

    return (
        <div>
            <h1 className="white">Maxepusen's Blog</h1><br />
            <div className="home">
                <div className="workouts">
                    {blogs && blogs.map((blog) => (
                        <BlogDetails key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;