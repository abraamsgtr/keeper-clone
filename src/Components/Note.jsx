import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

// function createNote(note) {
//   return (
//     <note>
//       <h1>{note.title}</h1>
//       <p>{note.content}</p>
//     </note>
//   );
// }

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          console.log("delete");
          props.handleItemDelete(props.id);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
