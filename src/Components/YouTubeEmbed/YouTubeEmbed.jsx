import React from 'react';
import './YouTubeEmbed.css';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="video-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
