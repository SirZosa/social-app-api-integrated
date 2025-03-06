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

export async function likePost(post_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/like`;
    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                post_id:post_id
            })
        })
        let liked = false
        if(res.status == 201){
            liked = true
        }
        return liked
    }
    catch(e){
        console.log("could not like post")
        return false
    }  
}

export async function dislikePost(post_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/like`;
    try{
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                post_id:post_id
            })
        })
        let disliked = false
        if(res.status == 200){
            disliked = true
        }
        return disliked
    }
    catch(e){
        console.log("could not like post")
        return false
    }  
}