import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import API from "../secrets";
const qs = require("querystring");
const _ = require("lodash");
const dotenv = require("dotenv");
const path = require("path");
const currentPath = path.join(__dirname);

const URL = API;

const apiConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

function App() {
  const [inputText, setInputText] = useState({
    title: "",
    content: "",
    id: "",
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setItems([]);
    const response = await axios.get(URL);
    console.log(response.data);
    const data = response.data;
    if (data != null) {
      if (data["notes"].length > 0) {
        data["notes"].forEach((note) => {
          setItems((prevItems) => {
            return [
              ...prevItems,
              { title: note.title, content: note.content, id: note._id },
            ];
          });
        });
      }
    }
  };

  function handleAdd(event) {
    if (inputText != null) {
      // setItems((prevItems) => {
      //   return [
      //     ...prevItems,
      //     { title: inputText.title, content: inputText.content },
      //   ];
      // });
      // console.log("clear");

      const newNote = {
        title: inputText.title,
        content: inputText.content,
      };

      axios.post(URL, qs.stringify(newNote), apiConfig).then((res) => {
        const data = res.data;

        console.log(data);
        if (data != null) {
          setInputText({
            title: "",
            content: "",
          });
          getData();
        }
      });
    }

    //event.preventDefault();
  }

  function HandleDelete(itemIndex) {
    // setItems((prevItems) => {
    //   return prevItems.filter((element, index) => {
    //     return index !== itemIndex;
    //   });
    // });

    axios.delete(`${URL}/${itemIndex}`, apiConfig).then((res) => {
      const data = res.data;
      if (data != null) {
        getData();
      }
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prevText) => {
      return {
        ...prevText,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <Header />
      {/* {notes.map((note) => (
        <Note key={note.key} title={note.title} content={note.content} />
      ))} */}
      <CreateArea
        handleChange={handleChange}
        placeHolder={"Title"}
        titlevalue={inputText.title}
        handleNoteChange={handleChange}
        areaPlaceHolder={"Take a note..."}
        notevalue={inputText.content}
        handleAdd={handleAdd}
      />
      {items.map((item, index) => {
        return (
          <Note
            key={index}
            content={item.content}
            title={item.title}
            id={item.id}
            handleItemDelete={HandleDelete}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
