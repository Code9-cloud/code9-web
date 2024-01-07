import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {dracula} from "@uiw/codemirror-theme-dracula";
// import './CodeBlockEditor.css';

type Props = {
    code: string,
    onCodeUpdate: (update:string) => void,
}

const CodeBlockEditor = ({code, onCodeUpdate} : Props) => {
    const onChange = React.useCallback((newCode: string, viewUpdate: any) => {
        onCodeUpdate(newCode);
    }, []);

    return <CodeMirror theme={dracula} value={code} height={'100%'} style={{height: '100%'}} extensions={[javascript({ jsx: true, typescript: true })]} onChange={onChange} />;
}

export default CodeBlockEditor;