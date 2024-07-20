import React, { useEffect, useState } from 'react';
import EditorComponent from './components/EditorComponent';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const fullText = "Hi, I'm an A.I. trained to evaluate and analyse your MBTI personalities based on your journal entries. To get started, I'll need to you to copy and paste all your diaries in the below box.\n I won't post or remember anything.";

  useEffect(() => {
    setIsLoading(false); // Simulate data fetch by setting loading to false

    let index = 0;
    const typeWriterEffect = () => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
        setTimeout(typeWriterEffect, 50);
      }
    };

    typeWriterEffect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="hover-effect" style={{ top: position.y, left: position.x }} />
      <div>
        <h1>What's your MBTI based on your journal entries?</h1>
      </div>
      <p className="typewriter-text">{text}</p>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <EditorComponent />
        )}
      </div>

    </div>
  );
};

export default App;

