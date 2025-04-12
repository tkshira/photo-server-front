import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AuthService from '../auth/services/auth-services';
import { jwtDecode, JwtHeader, JwtPayload } from "jwt-decode";

interface JWTPayloadPersonalData extends JwtPayload {
    name?: string
}

export default function Auth() {
    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const [name, setName] = useState<string>();

    useEffect(() => {
        const verifier = sessionStorage.getItem('verifier');
        if (verifier && code) {
            AuthService.acquireToken(verifier, code)
                .then(res => res.json())
                .then(result => {
                    sessionStorage.setItem('token', result.access_token);
                    const jwt = jwtDecode<JWTPayloadPersonalData>(result.id_token);
                    sessionStorage.setItem('user-name', jwt.name || "");
                    console.log(jwt);
                    setName(jwt.name);
                });
        }
    }, []);
    return (
        <div>
            <p>Welcome {name}!</p> 
            <p>You'll be redirected to home page</p>
        </div>
    )
}