import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



function CommentForm(props) {

    const [newComment, setNewComment] = useState({
        title: '',
        contents: ''
    });

    const handleChanges = e => {
        setNewComment({...newComment, [e.target.name]: e.target.value})
        console.log(newComment)
    }

    return (
        <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="title" className="mr-sm-2">Title</Label>
          <Input type="text" name="title" value={newComment.title} onChange={handleChanges}  id="title" placeholder="Title" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="contents" className="mr-sm-2">Contents</Label>
          <Input type="text" name="contents" value={newComment.contents} onChange={handleChanges} id="contents" placeholder="Contents" />
        </FormGroup>
        <Button onClick={()=> props.submit(newComment) } >Submit</Button>
      </Form>
    )
}

export default CommentForm;