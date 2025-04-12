import React, { useEffect, useState } from 'react';
import { BrowserRouter, redirect, Router, useNavigate } from 'react-router';
import PhotoList from '../photo-list/photo-list';
import PhotoListPreview from '../photo-list-preview/photo-list-preview';
import './main.css';
import { useAuth0 } from '@auth0/auth0-react';
import AuthService from '../auth/services/auth-services';
import { genCodeVerifier } from '../utils/crypto-utils';
import crypto from 'crypto';

export interface PhotoItemData {
    name: string;
    image: string;
}

export interface PhotoData {
    foldername: string;
    photolist: PhotoItemData[];
}

export default function Main() {
    const [photoList, setPhotoList] = useState<PhotoData[]>([]);

    const [selectedItem, setSelectedItem] = useState<PhotoData>();

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    useEffect(() => {
        // console.log(window.crypto);
        fetch(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/photo-data`)
            .then(res => res.json())
            .then(result => {
                setPhotoList(result);
            })
    }, [])

    function login() {
        fetch(`${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/login`)
            .then(res => res.text())
            .then(result => {
                // console.log(result);
                // navigate(result);
                window.location.href = result;
            })
    }

    function loginRedirect() {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }

    async function navigateToLogin() {
        const verifier = genCodeVerifier();
        sessionStorage.setItem('verifier', verifier);
        window.location.href = await AuthService.authorize(verifier);
        // const url = AuthService.authorize(verifier);
        // console.log(url);
    }

    return (
        <div>
            <h1>Photo List</h1>
            {
                !isAuthenticated &&
                <button onClick={navigateToLogin}>Login</button>

            }
            <div className="main">
                <div>
                    <PhotoList items={photoList} onClick={setSelectedItem} selectedItem={selectedItem}></PhotoList>
                </div>
                <div>
                    {selectedItem ? <PhotoListPreview photolist={selectedItem.photolist}></PhotoListPreview> : <div>Select an folder</div>}
                </div>
            </div>
        </div>
    )
}