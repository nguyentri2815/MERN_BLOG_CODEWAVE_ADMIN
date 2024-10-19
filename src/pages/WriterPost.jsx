import { Button, FileInput, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";
import Editor from "../components/Editor";
import useStore from "../stores";
import { useNavigate } from "react-router-dom";
import { isNotEmpty, useForm } from "@mantine/form";
import { uploadFile } from "../utils";
import { useCreate } from "../hooks/post";
import { textToSlug } from "../utils/string";

import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

const WriterPost = () => {
  //theme : mantin
  
  //file : util fireBase
  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState();
  React.useEffect(() => {
    if(file){
      uploadFile(setFileURL,file)
    }
  }, [file]);
  //auth
  const {user} = useStore();
  
  const navigate = useNavigate();
  if(!user?.name){
    navigate('/auth')
  }
  //Validation : maintin Form
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      category: ''
    },

    validate: {
      title: isNotEmpty('Enter your current title'),
      category: isNotEmpty('Enter your current category')
    },
  });
  //slug : until
  //Setting useEditor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color
    ],
    content:"",
  });
  //handleSubmit : zustand
  const create = useCreate(localStorage.getItem('token-blog-codewave') || '');
  const handleSubmit = (values)=>{
    console.log('editor.getHTML()',editor.getHTML());
    
    create.mutate({
      ...values,
      slug:textToSlug(values.title),
      image:fileURL,
      desc:editor.getHTML()
    })
  }
  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div>
          <TextInput
            label="Title"
            placeholder="Title"
            inputWrapperOrder={["label", "error", "input"]}
            key={form.key('title')}
            {...form.getInputProps('title')}
          />
          <Select
            label="Category"
            placeholder="Category"
            data={["NEWS", "CODING"]}
            key={form.key('category')}
            {...form.getInputProps('category')}
          />
          <FileInput
            accept="image/png,image/jpeg"
            label="Upload files"
            placeholder="Upload files"
            onChange={file => setFile(file)}
          />
        </div>
        <div>
          <Editor editor={editor}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default WriterPost;
