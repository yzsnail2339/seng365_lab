import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Assuming User type is defined elsewhere
// import { User } from 'your/path/to/types';

const User = () => {
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const getUser = useCallback(() => {
        axios
            .get(`http://localhost:3000/api/users/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        getUser();
    }, [getUser]);

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

    return (
        <div>
            {user ? (
                <div>
                    <h1>User Details</h1>
                    <p>User ID: {user.user_id}</p>
                    <p>Username: {user.username}</p>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                        Delete User
                    </button>

                    {/* Delete User Modal */}
                    <div className="modal fade" id="deleteUserModal" tabIndex={-1} role="dialog" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteUserModalLabel">
                                        Delete User
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are you sure that you want to delete this user?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteUser(user)}>
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
};

export default User;
