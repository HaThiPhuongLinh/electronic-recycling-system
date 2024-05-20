import React, { useState } from 'react';

const VideoUpload = ({ onFileChange }) => {
    const [video, setVideo] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setVideo(URL.createObjectURL(file));
        onFileChange(file);
    };

    const clearVideo = () => {
        setVideo(null);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className={`relative ${isFullScreen ? 'z-50 fixed top-0 left-0 w-full h-full' : ''}`} onClick={toggleFullScreen}>
            <input type="file" onChange={handleVideoChange} className="absolute inset-0 opacity-0 w-full h-full" />
            {video ? (
                <div>
                    <video
                        controls
                        className={`w-full h-full object-cover cursor-pointer ${isFullScreen ? 'absolute inset-0' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div>
                        <button onClick={clearVideo} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full">
                            Clear
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                    >
                        <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default VideoUpload;
