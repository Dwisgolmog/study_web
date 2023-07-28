import React from "react";
import Button from '@mui/material/Button';
import { ButtonGroup,Dialog,DialogTitle,DialogContent,DialogActions } from "@mui/material";
import { useState } from "react";

function Article(){
    const [open,setOpen] = useState(false);

    return(
        <article>
            <h2>Welcome</h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            <br />
            <ButtonGroup>
                <Button variant="outlined" onClick={()=>setOpen(true)}>Create</Button>
                <Button variant="outlined">Update</Button>
            </ButtonGroup>
            <Button variant="outlined">Delete</Button>
            
            
            <Dialog open={open}>
                <DialogTitle>Create</DialogTitle>
                <DialogContent>Hello Create!</DialogContent>
                <DialogActions>
                    <Button variant="outlined">Create</Button>
                    <Button variant="outlined" onClick={()=>setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </article>
    );
}

export default Article;