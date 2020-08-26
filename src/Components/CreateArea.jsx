import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [zoomed, setZoom] = useState(false);

  function handleZoomClick() {
    setZoom(true);
  }

  return (
    <div>
      <form className="create-note" autocomplete="off">
        {zoomed && (
          <input
            onChange={props.handleChange}
            name="title"
            placeholder={props.placeHolder}
            value={props.titlevalue}
            autoComplete={false}
          />
        )}
        <textarea
          onClick={() => {
            handleZoomClick();
          }}
          onChange={props.handleChange}
          name="content"
          placeholder={props.areaPlaceHolder}
          rows={zoomed ? 3 : 1}
          value={props.notevalue}
        />
        <Zoom in={zoomed}>
          <Fab
            onClick={() => {
              props.handleAdd();
              setZoom(false);
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
