import React from "react";
import PropTypes from "prop-types";

const AnalyzeModal = ({ show, result, onClose }) => {
  if (!show) return null;

  const createMarkup = (text) => {

    const boldText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    return { __html: boldText.replace(/\n/g, '<br/>') };
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div dangerouslySetInnerHTML={createMarkup(result)} />
      </div>
    </div>
  );
};

AnalyzeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  result: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default AnalyzeModal;
