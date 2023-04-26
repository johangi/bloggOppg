import { useState } from 'react';
import { useBlogsContext } from './useBlogsContext';

export const useGetBlogs = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useBlogsContext();

    const getBlogs = async (user, author) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ author })
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'SET_BLOGS', payload: json });

            // update loading state
            setIsLoading(false);
        }
    }

    return { getBlogs, isLoading, error }
}