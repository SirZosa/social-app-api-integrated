import './upload-post.css'
import { useState, useRef } from 'react';
export default function PostUploader(){
    const [text, setText] = useState<string>('');
    const [charCount, setCharCount] = useState<number>(0);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 400) {
            setText(inputText);
            setCharCount(inputText.length);
        }
    };

    const handleImageButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(files);
        }
    };

    return (
        <div className="text-uploader">
            <textarea
                className="text-uploader-textarea"
                value={text}
                onChange={handleTextChange}
                placeholder="Write something (max 400 characters)..."
                maxLength={400}
            />
            <div className="footer">
                <span className="char-count">{charCount}/400</span>
                <div>
                    <button className="image-button" onClick={handleImageButtonClick}>
                        Images
                    </button>
                    <button className="upload-button" disabled={charCount === 0 && selectedFiles.length === 0}>
                        Post
                    </button>
                </div>
            </div>
            {/* Hidden file input */}
            <input
                type="file"
                className="file-input"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png, .gif, .webp" // Accept common image formats
                multiple // Allow multiple files
            />
            {/* Display selected files */}
            {selectedFiles.length > 0 && (
                <div className="selected-files">
                    <strong>Selected Files:</strong>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}