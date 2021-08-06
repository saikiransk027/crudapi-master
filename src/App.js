import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Data from "./data.json";
import { v1 as uuidv1 } from 'uuid';
import axios from 'axios';

function App() {

  const titleRef = useRef();
  const contentRef = useRef();

  const [data, setData] = useState(Data);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const [updateID, setUpdateID] = useState();
  const [updateTitle, setUpdateTitle] = useState();
  const [updateContent, setUpdateContent] = useState();

  useEffect(() => {
    // console.log(data);
    // setDate(Data)
    // clear form fields
    titleRef.current.value = null;
    contentRef.current.value = null;
  }, [data]);




  const addPost = () => {
    if (title && content) {
      let newPost = {
        "id": uuidv1(),
        "title": title,
        "content": content
      }
      let posts = [...data, newPost];
      setData(posts);
      setTitle();
      setContent();

      saveJson(posts);

    }
  }




  const deletePost = (key) => {
    let filterOutPost = [...data].filter(OBJ => OBJ.id !== key);
    setData(filterOutPost);

    saveJson(filterOutPost);

  }


  const populatePost = (key, title, content) => {
    setUpdateID(key);
    setUpdateTitle(title);
    setUpdateContent(content);
  }


  const updatePost = () => {
    let editedPost = {
      "id": updateID,
      "title": updateTitle,
      "content": updateContent
    }
    let filterPost = [...data].filter(OBJ => OBJ.id !== updateID);
    let posts = [...filterPost, editedPost];
    setData(posts);

    setUpdateID();
    setUpdateTitle();
    setUpdateContent();

    saveJson(posts);

  }


  const saveJson = (posts) => {
    const url = 'http://localhost:5000/write'
    axios.post(url, posts)
      .then(response => {
        // console.log(response);
      });
  }


  const saveData = jsonDate => {
    const fileData = JSON.stringify(jsonDate);

    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'newData.json';
    link.href = url;
    link.click();
  }



  return (
    <div className="App">

      <div id="tree">
        <h4>Add New Post</h4>
        <input placeholder="Title" id="fish"
          onChange={e => setTitle(e.target.value)}
          value={title || ''}
          ref={titleRef}

        />
        <br />
        <br />
        <textarea
          placeholder="Content"
          onChange={e => setContent(e.target.value)}
          value={content || ''}
          ref={contentRef} id="sea"
        ></textarea>
        <br />
        <button onClick={addPost}>Add Post</button>
      </div>

      {/* If temp state has got values of title and content for update form show this */}

      { updateTitle || updateContent ?
        (
          <div id="bee">
            <h4>Update Post</h4>
            <input placeholder="Title" id="lish"
              onChange={e => setUpdateTitle(e.target.value)}
              value={updateTitle || ''}
            />
            <br />
            <br />
            <textarea
              placeholder="Content" id="qish"
              onChange={e => setUpdateContent(e.target.value)}
              value={updateContent || ''}
            ></textarea>
            <br />
            <button onClick={updatePost}>Update Post</button>
          </div>
        ) : null}

      <div className="posts" >
        {data ? data.map(post => {
          return (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => populatePost(post.id, post.title, post.content)}>Edit</button>&nbsp;
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          )
        }) : null}
        <div className="btn-download">
          <button onClick={e => saveData(data)}>Download Data</button>
        </div>
      </div>
    </div>
  );
}

export default App;