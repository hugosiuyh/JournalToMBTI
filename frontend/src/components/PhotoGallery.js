import React from 'react';
import './PhotoGallery.css';

const photos = [
    'infp.jpg',
    'enfp.jpg',
    'infj.jpg',
    'enfj.jpg',
    'intj.jpg',
    'entj.jpg',
    'intp.jpg',
    'entp.jpg',
    'isfp.jpg',
    'esfp.jpg',
    'istp.jpg',
    'estp.jpg',
    'isfj.jpg',
    'esfj.jpg',
    'istj.jpg',
    'estj.jpg'
];

const PhotoGallery = () => {
    return (
        <div>
            <h1>Photo Gallery</h1>
            <div className="photo-gallery">
                {photos.map((photo, index) => (
                    <img 
                        key={index}
                        src={`${process.env.PUBLIC_URL}/photos/${photo}`} 
                        alt={`Photo ${index + 1}`}
                        className="photo"
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
