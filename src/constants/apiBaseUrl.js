import { getAuthToken } from "../utils/localStorage";
export const BASE_URL = "http://localhost:4000";
export const API_HEADER = {
    headers: {
        "key": "yKpfJj/Q6tuTM4xXebG3r1yKv/hnVdo9thIyUJNDOSLkw+q8SIsTU+Put4tpgj7Zp3jsPq8PMyw=",
    }
}

export const API_HEADER_AUTH = {
    headers: {
        "Authorization": getAuthToken(),
        "key": "yKpfJj/Q6tuTM4xXebG3r1yKv/hnVdo9thIyUJNDOSLkw+q8SIsTU+Put4tpgj7Zp3jsPq8PMyw="
    }
} 