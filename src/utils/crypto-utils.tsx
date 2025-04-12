// const randomBytes = require('randombytes');
// import { Buffer } from 'buffer';
// import randomBytes from 'randombytes';
// import createHash from 'create-hash';
// const crypto = await import("crypto");
// import * as crypto from 'crypto';

function base64URLEncode(str: Uint8Array) {
    return btoa(String.fromCharCode(...str))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    // return str.toString('base64')
    //     .replace(/\+/g, '-')
    //     .replace(/\//g, '_')
    //     .replace(/=/g, '');
}

export function genCodeVerifier() {
    console.log(window.crypto.getRandomValues(new Uint8Array(32)));
    return base64URLEncode(window.crypto.getRandomValues(new Uint8Array(32)));
}

async function sha256(buffer: string){
    const encoder = new TextEncoder();
    const data = encoder.encode(buffer);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(hashBuffer);
}

export async function genCodeChallenge(verifier: string) {
    return base64URLEncode(await sha256(verifier));
}

export function genState() {
    return window.crypto.randomUUID().toString();
}