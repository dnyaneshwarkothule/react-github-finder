import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //search user
    const searchUser = async (queryText) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/search/users?q=${queryText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items,
        });
        // setUsers(res.data.items);
    };

    //get user
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        dispatch({
            type: GET_USER,
            payload: res.data,
        });
    };

    //get repos
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    };

    //clear users
    const clearSearch = () => dispatch({ type: CLEAR_USERS });
    // const clearSearch = () => {
    //     setUsers([]);
    //     setLoading(false);
    // };

    //set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <githubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUser,
                clearSearch,
                getUser,
                getUserRepos,
            }}
        >
            {props.children}
        </githubContext.Provider>
    );
};

export default GithubState;
