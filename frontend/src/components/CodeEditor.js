import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python'; // Add for Python, C++, Java as needed
import './../styles/CodeEditor.css';

const CodeEditor = ({ language = 'python' }) => {
  const [code, setCode] = React.useState('// Write your code here');

  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages[language])}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        border: '1px solid #ccc',
      }}
    />
  );
};

export default CodeEditor;