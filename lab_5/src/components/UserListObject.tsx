import React from "react";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";
import {useUserStore} from "../store";
import {Button, Card, CardActions, CardContent, CardMedia, Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import CSS from 'csstype';
interface IUserProps {
    user: User
}
const UserListObject = (props: IUserProps) => {
    const [user] = React.useState<User>(props.user)
    const [username, setUsername] = React.useState("")
    const [openEditDialog, setOpenEditDialog] = React.useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    const deleteUserFromStore = useUserStore(state => state.removeUser)
    const editUserFromStore = useUserStore(state => state.editUser)
    const deleteUser = () => {
        axios.delete('http://localhost:3000/api/users/' + user.user_id)
            .then(() => {
                deleteUserFromStore(user)
            })
    }
    const editUser = () => {
        axios.put('http://localhost:3000/api/users/'+user.user_id,
            {"username": username})
            .then(() => {
                editUserFromStore(user, username)
            })
    }
    const userCardStyles: CSS.Properties = {
        display: "inline-block",
        height: "328px",
        width: "300px",
        margin: "10px",
        padding: "0px"
    }
    return (
        <Card sx={userCardStyles}>
            <CardMedia
                component="img"
                height="200"
                width="200"
                sx={{objectFit:"cover"}}
                image="https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg"
                alt="User hero image"
            />
            <CardContent>
                <Typography variant="h4">
                    {user.user_id} {user.username}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => {setOpenEditDialog(true)}}>
                    <Edit/>
                </IconButton>
                <IconButton onClick={() => {setOpenDeleteDialog(true)}}>
                    <Delete/>
                </IconButton>
            </CardActions>
            ADD EDIT/DELETE DIALOGS HERE
        </Card>
    )
}
export default UserListObject
