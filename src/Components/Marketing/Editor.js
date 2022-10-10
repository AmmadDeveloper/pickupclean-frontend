import React from "react";
import { Editor as WysiwygEditor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { EditorState,convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class Editor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
      }

      componentDidUpdate(){
        if(this.props.resetForm){
          this.setState({editorState:EditorState.createEmpty()})
          this.props.setresetForm(false)
        }
      }
    
      onEditorStateChange= (editorState) => {
        this.setState({
          editorState,
        });
        this.convertContentToHTML();

      };

      convertContentToHTML = () => {
        let currentContentAsHTML = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        //this.setState({convertedContent:currentContentAsHTML});
        this.props.setemailContent(currentContentAsHTML)
        //https://github.com/jpuri/react-draft-wysiwyg/issues/208
      }

    render(){
        return(
        <WysiwygEditor
        hashtag={{
            separator: ' ',
            trigger: '#',
          }}
            editorStyle={{border:'1px solid lightgrey',height:'300px'}}
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="border-around"
            editorClassName="editor"
            onEditorStateChange={this.onEditorStateChange}
        />
        );
    }
}