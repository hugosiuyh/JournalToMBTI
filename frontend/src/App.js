import React, { useEffect, useState, useRef } from 'react';
import EditorComponent from './components/EditorComponent';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showHoverEffect, setShowHoverEffect] = useState(true);
  const editorRef = useRef(null);
  const fullText = "Hi, I'm an A.I. trained to evaluate and analyse your MBTI personalities based on your journal entries. To get started, I'll need you to copy and paste all your diaries in the below box.\n I won't post or remember anything.";


  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
    const asyncEffect = async () => {
      setIsLoading(false); 
      await delay(2000);
      
      let index = 0;
      const typeWriterEffect = () => {
        if (index < fullText.length) {
          setText((prev) => prev + fullText.charAt(index));
          index++;
          setTimeout(typeWriterEffect, 50);
        }
      };
      
      typeWriterEffect();
    };
    
    asyncEffect();
  }, []);


  useEffect(() => {
    // Throttle function
    const throttle = (func, limit) => {
      let inThrottle;
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });

      if (editorRef.current) {
        const rect = editorRef.current.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          setShowHoverEffect(false);
        } else {
          setShowHoverEffect(true);
        }
      }
    };

    // Throttle the mouse move handler
    const throttledMouseMove = throttle(handleMouseMove, 100);

    window.addEventListener('mousemove', throttledMouseMove);
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);

  return (
    <div className="app-container">
      {showHoverEffect && (
        <div className="hover-effect" style={{ top: position.y, left: position.x }} />
      )}
      <div>
        <h1>What's your MBTI based on your journal entries?</h1>
      </div>
      <p className="typewriter-text">{text}</p>
      <div 
        ref={editorRef}
      >
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
