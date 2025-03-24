import type {CommentData} from '../components/comment-section/comment-section'
import type {PostProps} from '../components/post/post'
import  {ProfileProps} from '../interfaces/interfaces'
export async function getPosts(page: number, next: (postsData: { posts: [], hasMore: boolean }) => void) {
    try {
        const url = `http://localhost:3000/v1/posts?page=${page}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.status == 200){
            const data = await response.json()
            next(data)
        }
    } catch (e) {
        console.error('Error fetching posts:', e);
        next({ posts: [], hasMore: false }); // No more posts available
    }
} 

export async function getFolloweePosts(page: number, next: (postsData: { posts: [], hasMore: boolean }) => void) {
    try {
        const url = `http://localhost:3000/v1/posts/following?page=${page}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.status == 200){
            const data = await response.json()
            next(data)
        }
        else if(response.status == 401){
            next({ posts: [], hasMore: false }); // No more posts available
        }
    } catch (e) {
        console.error('Error fetching posts:', e);
        next({ posts: [], hasMore: false }); // No more posts available
    }
}
export async function getSavedPosts(page: number, next: (postsData: { posts: [], hasMore: boolean }) => void) {
    try {
        const url = `http://localhost:3000/v1/posts/saved?page=${page}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.status == 200){
            const data = await response.json()
            next(data)
        }
        else if(response.status == 401){
            next({ posts: [], hasMore: false }); // No more posts available
        }
    } catch (e) {
        console.error('Error fetching posts:', e);
        next({ posts: [], hasMore: false }); // No more posts available
    }
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

export async function savePost(post_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/savepost`;
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
        let saved = false
        if(res.status == 201){
            saved = true
        }
        return saved
    }
    catch(e){
        console.log("could not save post")
        return false
    }  
}

export async function removePost(post_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/savepost`;
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
        let removed = false
        if(res.status == 200){
            removed = true
        }
        return removed
    }
    catch(e){
        console.log("could not remove post")
        return false
    }  
}

export async function uploadPost(content:string, media_url?:string| undefined){
    const url = `http://localhost:3000/v1/posts`;
    try{
        const res = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                content:content,
                media_url:media_url
            })
        })
        if(res.status == 201){
            const post_id = await res.json()
            return post_id
        }
    }
    catch(e){
        console.log("could not remove post")
        return false
    }
}

export async function getUserInfo(){
    const url = 'http://localhost:3000/v1/user'
    try{
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'})
          if(res.status == 200){
            const info = await res.json()
            return info
          }
      }
      catch(e){
        alert('Could not log in')
      }
}

export async function followUser(user_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/follow`;
    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                followee_id:user_id
            })
        })
        let followed = false
        if(res.status == 201){
            followed = true
        }
        return followed
    }
    catch(e){
        console.log("could not follow user")
        return false
    }  
}

export async function unfollowUser(user_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/follow`;
    try{
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                followee_id:user_id
            })
        })
        let unfollowed = false
        if(res.status == 201){
            unfollowed = true
        }
        return unfollowed
    }
    catch(e){
        console.log("could not unfollow user")
        return false
    }  
}

export async function removeFollower(user_id:string):Promise<boolean>{
    const url = `http://localhost:3000/v1/removeFollower`;
    try{
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                followee_id:user_id
            })
        })
        let unfollowed = false
        if(res.status == 201){
            unfollowed = true
        }
        return unfollowed
    }
    catch(e){
        console.log("could not remove follower")
        return false
    }  
}

export async function getComments(post_id: string, page: number): Promise<CommentData[]> {
    const url = `http://localhost:3000/v1/comment/${post_id}?page=${page}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            const comments = await res.json();
            return comments;
        }
        return [];
    } catch (e) {
        console.log("Error fetching comments");
        return [];
    }
}

export async function uploadComment(post_id: string, comment: string):Promise<string>{
    const posted = await fetch('http://localhost:3000/v1/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            post_id: post_id,
            content: comment
        })
    })
    if(posted.status == 201){
        const comment_id = await posted.json()
        return comment_id
    }
    return ''
}

export async function getPost(post_id: string): Promise<PostProps | null> {
    const url = `http://localhost:3000/v1/post/${post_id}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            const post = await res.json();
            return post;
        }
        return null;
    } catch (e) {
        console.log("Error fetching post");
        return null;
    }
}

export async function logout(): Promise<boolean> {
    const url = 'http://localhost:3000/v1/logout';
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (e) {
        console.log("Error logging out");
        return false;
    }
}

export async function getProfile(user_hex_id: string): Promise<ProfileProps | null> {
    const url = `http://localhost:3000/v1/profile/${user_hex_id}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            const profile = await res.json();
            return profile;
        }
        return null;
    } catch (e) {
        console.log("Error fetching profile");
        return null;
    }
}

export async function getProfilePosts(user_hex_id: string, page: number, next: (postsData: { posts: [], hasMore: boolean }) => void) {
    try {
        const url = `http://localhost:3000/v1/profile/${user_hex_id}/posts?page=${page}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.status == 200){
            const data = await response.json()
            next(data)
        }
    } catch (e) {
        console.error('Error fetching posts:', e);
        next({ posts: [], hasMore: false }); // No more posts available
    }
}

export async function getProfileFollowers(user_hex_id: string, page: number, next: (followersData: { followers: [], hasMore: boolean }) => void) {
    try {
        const url = `http://localhost:3000/v1/followers/${user_hex_id}?page=${page}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.status == 200){
            const data = await response.json()
            next(data)
        }
    } catch (e) {
        console.error('Error fetching followers:', e);
        next({ followers: [], hasMore: false }); // No more followers available
    }
}

export async function getProfileFollowing(user_hex_id: string, page: number, next: (followingData: { following: [], hasMore: boolean }) => void) {
    try {
        const url = `http://localhost:3000/v1/following/${user_hex_id}?page=${page}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.status == 200){
            const data = await response.json()
            next(data)
        }
    } catch (e) {
        console.error('Error fetching following:', e);
        next({ following: [], hasMore: false }); // No more following available
    }
}
