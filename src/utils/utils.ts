export function getPosts(page: number, next: (postsData: { posts: [], hasMore: boolean }) => void) {
    async function fetchData() {
        try {
            const url = `http://localhost:3000/v1/posts?page=${page}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error(data.error);
                        next({ posts: [], hasMore: false }); // No more posts available
                    } else {
                        next(data); // Pass the posts and hasMore flag to the callback
                    }
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.error('Error fetching posts:', e);
            next({ posts: [], hasMore: false }); // No more posts available
        }
    }
    fetchData();
}