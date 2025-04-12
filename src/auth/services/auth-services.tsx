import { genCodeChallenge, genState } from "../../utils/crypto-utils";

const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
const clientid = process.env.REACT_APP_AUTH0_CLIENTID || "";
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI || "";

const AuthService = {
    authorize: async (verifier: string) => {
        const codeChallenge = await genCodeChallenge(verifier);
        const state = genState();
        return `${domain}/authorize?
            response_type=code&
            client_id=${clientid}&
            code_challenge=${codeChallenge}&
            code_challenge_method=S256&
            redirect_uri=${redirectUri}&
            scope=openid profile offline_access&
            audience=appointments:api&
            state=${state}`;
    },
    acquireToken: (verifier: string, code: string) => {
        return fetch(`${domain}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: clientid,
                code_verifier: verifier,
                code: code,
                redirect_uri: redirectUri
            })
        });
    }
}

export default AuthService;