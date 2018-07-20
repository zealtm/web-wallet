import { getAuthToken } from "../utils/localStorage";
export const BASE_URL = "http://localhost:4000";
export const API_HEADER = {
    headers: {
        "x-api-key": "eJbc401iph5qGp0miqJfo778uxQHgMil2T0KIC9i",

    }
}

export const API_HEADER_AUTH = {
    headers: {
        "Authorization": getAuthToken()
    }
} 