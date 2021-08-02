import React, { useContext } from 'react';
import { Spinner } from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
    const githubContext = useContext(GithubContext);

    const { loading, users } = githubContext;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userCardStyle}>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
};

const userCardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
};

export default Users;
