import { useRef } from 'react';
import send from '../../assets/send.svg';
import './write-comment.css';

type WriteCommentProps = {
    onSubmit: (comment: string) => void;
}

export default function WriteComment({ onSubmit }: WriteCommentProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.style.maxHeight='110px'
            textareaRef.current.style.overflowY='scroll'
        }
    };

    return (
        <form className="write-comment" onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const comment = formData.get('comment') as string;
            onSubmit(comment);
            if(textareaRef.current) {
                textareaRef.current.value = ''
                textareaRef.current.style.height = 'auto';
            }
        }}>
            <textarea
                ref={textareaRef}
                name="comment"
                placeholder="Write a comment..."
                onInput={handleInput}
                rows={1}
            />
            <button type="submit" className='write-button'>
                <img src={send} alt="send" className='write-img'/>
            </button>
        </form>
    );
}