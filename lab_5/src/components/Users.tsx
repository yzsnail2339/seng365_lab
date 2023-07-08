import React from "react";
import axios from "axios"
import {Link} from 'react-router-dom'


// 假设我们已经在其他地方定义了 User 类型
// import { User } from 'your/path/to/types';

const Users = () => {
    const [users, setUsers] = React.useState<Array<User>>([]);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setUsers(response.data);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            });
    };
    const list_of_users = () => {
        return users.map((item: User) =>
            <tr key={item.user_id}>
                <th scope="row">{item.user_id}</th>
                <td>{item.username}</td>
                <td><Link to={"/users/" + item.user_id}>Go to
                    user</Link></td>
                <td>
                    <button type="button">Delete</button>
                    <button type="button">Edit</button>
                </td>
            </tr>
        )
    }

    // 返回 JSX，渲染 UI
    // 如果有错误，显示错误信息。否则，展示用户列表。
    if (errorFlag) {
        return (
            <div>
                <h1>Users</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Users</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username</th>
                        <th scope="col">link</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_of_users()}

                    </tbody>
                </table>
            </div>
        )
    }
};
export default Users;
