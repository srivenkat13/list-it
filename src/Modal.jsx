import { useEffect, useRef } from "preact/hooks";

const Modal = ({ handleEditSubmit, editInput, setEditInput, closeModal }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            ref={inputRef}
            onBlur={closeModal}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
