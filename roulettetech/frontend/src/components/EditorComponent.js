import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import './EditorComponent.css'; // Import the CSS file for styling
import AnalyzeModal from './AnalyzeModal';

const EditorComponent = () => {
  const [blocks, setBlocks] = useState([]);
  const [deletedBlockIds, setDeletedBlockIds] = useState([]);
  const [analyzeResult, setAnalyzeResult] = useState(null);
  const [friendsResult, setFriendsResult] = useState(null);
  const [mbtiType, setMbtiType] = useState(null);
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showFriendsButton, setShowFriendsButton] = useState(false)

  const editorOptions = { uploadFile: () => {} };
  const editor = useCreateBlockNote(editorOptions);
  const blocksRef = useRef(blocks);

  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  const handleEditorChange = () => {
    if (editor && editor.document) {
      const currentBlocks = editor.document;

      const currentBlockIds = currentBlocks.map(block => block.id);
      const deletedIds = blocksRef.current.filter(block => !currentBlockIds.includes(block.id)).map(block => block.id);

      setDeletedBlockIds(prev => [...new Set([...prev, ...deletedIds])]);
      setBlocks(currentBlocks);
      setShowFriendsModal(false); // Disable show friends modal on editor change
    }
  };

  const handleAnalyzeSubmit = () => {
    console.log('Submitting blocks for analysis:', blocksRef.current);
    axios.post('http://127.0.0.1:8000/api/analyze/', 
      { 
        blocks: blocksRef.current,
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      console.log('Successfully analyzed:', response);
      const match = response.data.personality_type.match(/Personality Type: (\w+)/);
      if (match && match[1]) {
        const personalityType = match[1];
        setAnalyzeResult(response.data.personality_type);
        setMbtiType(personalityType !== "none" ? personalityType : null);
        setShowAnalyzeModal(true);
        setShowFriendsButton(true);
      } else {
        setMbtiType(null);
        setShowFriendsButton(false);
      }
    })
    .catch(error => {
      console.error('Failed to analyze editor data', error);
    });
  };

  const handleFriendsSubmit = () => {
    if (!mbtiType) return;

    console.log('Submitting MBTI type for friends:', mbtiType);
    axios.post('http://127.0.0.1:8000/api/friends/', 
      { 
        mbti_type: mbtiType,
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      console.log('Successfully fetched friends:', response);
      setFriendsResult(response.data);
      setShowFriendsModal(true);
    })
    .catch(error => {
      console.error('Failed to fetch friends data', error);
    });
  };

  const lightWithBlack = {
    colors: {
      editor: {
        text: "#000000",
        background: "#FFFFFF",
      },
      menu: {
        text: "#3f3f3f",
        background: "#ffffff",
      },
      tooltip: {
        text: "#3f3f3f",
        background: "#efefef",
      },
      hovered: {
        text: "#3f3f3f",
        background: "#efefef",
      },
      selected: {
        text: "#ffffff",
        background: "#3f3f3f",
      },
      disabled: {
        text: "#afafaf",
        background: "#efefef",
      },
      shadow: "#cfcfcf",
      border: "#efefef",
      sideMenu: "#cfcfcf",
      highlights: {
        gray: {
          text: "#9b9a97",
          background: "#ebeced",
        },
        brown: {
          text: "#64473a",
          background: "#e9e5e3",
        },
        red: {
          text: "#e03e3e",
          background: "#fbe4e4",
        },
        orange: {
          text: "#d9730d",
          background: "#f6e9d9",
        },
        yellow: {
          text: "#dfab01",
          background: "#fbf3db",
        },
        green: {
          text: "#4d6461",
          background: "#ddedea",
        },
        blue: {
          text: "#0b6e99",
          background: "#ddebf1",
        },
        purple: {
          text: "#6940a5",
          background: "#eae4f2",
        },
        pink: {
          text: "#ad1a72",
          background: "#f4dfeb",
        },
      },
      fontFamily: "Roboto",
    },
  };

  return (
    <>
      <div className="editor-container">
        <BlockNoteView editor={editor} theme={lightWithBlack} onChange={handleEditorChange} />
      </div>
      <div>
        <button onClick={handleAnalyzeSubmit}>Analyze</button>
        {showFriendsButton && mbtiType && <button onClick={handleFriendsSubmit}>Show potential friends</button>}
      </div>

      <AnalyzeModal 
        show={showAnalyzeModal} 
        result={analyzeResult} 
        onClose={() => setShowAnalyzeModal(false)} 
        onFindFriends={handleFriendsSubmit}
      />

      {showFriendsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowFriendsModal(false)}>&times;</span>
            <p>Ideal: {friendsResult?.Ideal?.join(', ') ?? ''}</p>
            <p>Good: {friendsResult?.Good?.join(', ') ?? ''}</p>
            <p>Alright: {friendsResult?.Alright?.join(', ') ?? ''}</p>
            <p>Not Ideal: {friendsResult?.['Not Ideal']?.join(', ') ?? ''}</p>
            <p>Uh-Oh, Think This One Through: {friendsResult?.['Uh-Oh, Think This One Through']?.join(', ') ?? ''}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorComponent;
