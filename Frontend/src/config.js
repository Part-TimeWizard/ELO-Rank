/**
 * This file declares the basic axios stuff for use by everyone else
 * as a global import.
 */
import axios from 'axios';

// create the axios object used to interact with the API
const api = axios.create({
    // this gets changed for production, but this works for local dev
    //baseURL: 'http://localhost:4200/api/'
    baseURL: ':4200/api/'
});

export default api;