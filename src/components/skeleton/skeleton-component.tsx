import { Skeleton } from '@mui/material';
import './skeleton-component.css';
type SkeletonComponentProps = {
    variant: 'post' | 'comment' | 'user-card';
}

export default function SkeletonComponent({variant}: SkeletonComponentProps){
    if(variant === 'post'){
        return(
            <div className="post-skeleton">
                <div className="post-header-skeleton">
                    <Skeleton sx={{bgcolor:'#222'}} animation='wave' variant="circular" width={40} height={40} />
                    <Skeleton sx={{bgcolor:'#222', fontSize:'18px'}} animation='wave' variant="text" width={100} />
                </div>
                <Skeleton sx={{bgcolor:'#222'}} animation='wave' variant="rectangular" width='100%' height={40}/>
                <Skeleton sx={{bgcolor:'#222', fontSize:'14px', margin:'10px 0'}} animation='wave' variant="text" width={80} />
                <Skeleton sx={{bgcolor:'#222'}} animation='wave' variant="rectangular" width={170} height={20}/>
            </div>
        )
    }

    else if(variant === 'comment'){
        return(
            <div className="comment-skeleton">
                <Skeleton sx={{bgcolor:'#222', marginTop:'10px'}} variant='circular' width={30} height={30} />
                <div className="comment-content-skeleton">
                    <div className="comment-info-skeleton">
                        <Skeleton sx={{bgcolor:'#111', fontSize:'18px'}} variant='text' width={100}/>
                        <Skeleton sx={{bgcolor:'#111'}} variant='rectangular' width='100%' height={80}/>
                    </div>
                    <Skeleton sx={{bgcolor:'#222', fontSize:'14px', marginLeft:'10px'}} variant='text' width={100}/>
                </div>
            </div>
        )
    }

    else if(variant === 'user-card'){
        return(
            <div className="post-header-skeleton">
                    <Skeleton sx={{bgcolor:'#222'}} animation='wave' variant="circular" width={40} height={40} />
                    <Skeleton sx={{bgcolor:'#222', fontSize:'18px'}} animation='wave' variant="text" width={100} />
                    <Skeleton sx={{bgcolor:'#222', fontSize:'24px'}} animation='wave' variant="text" width={100} />
                </div>
        )
    }
}