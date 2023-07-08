import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Assuming User type is defined elsewhere
// import { User } from 'your/path/to/types';

const User = () => {
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const [dialogUser, setDialogUser] = React.useState<User>({username:"", user_id:-1})

    const getUser = useCallback(() => {
        axios
            .get(`http://localhost:3000/api/users/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); // add id as a dependency

    useEffect(() => {
        getUser();
    }, [getUser]); // add getUser as a dependency

    const deleteUser = (user: User) => {
        axios
            .delete(`http://localhost:3000/api/users/${user.user_id}`)
            .then((response) => {
                navigate('/users');
            })
            .catch((error) => {
                setErrorMessage(error.toString());
            });
    };

    const handleDeleteDialogOpen = (user:User) => {
        setDialogUser(user)
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setDialogUser({username:"", user_id:-1})
        setOpenDeleteDialog(false);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h1>User Details</h1>
                    <p>User ID: {user.user_id}</p>
                    <p>Username: {user.username}</p>
                    <Button variant="outlined" endIcon={<DeleteIcon/>} onClick={() =>
                    {handleDeleteDialogOpen(user)}}>
                        Delete
                    </Button>

                    <Dialog
                        open={openDeleteDialog}
                        onClose={handleDeleteDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this user?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                            <Button variant="outlined" color="error" onClick={() => deleteUser(dialogUser)} autoFocus>Delete</Button>
                        </DialogActions>
                    </Dialog>

                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
};

export default User;
