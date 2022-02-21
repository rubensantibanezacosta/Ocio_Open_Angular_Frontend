import jwt_decode from 'jwt-decode';

export function getDataFromToken(): any {
    try {
        return jwt_decode(localStorage.getItem("ocioToken"));
    }
    catch (Error) {
        return null;
    }
}