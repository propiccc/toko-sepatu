/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('access_token');
// window.axios.defaults.baseURL = `${import.meta.env.VITE_APP_URL}/`;


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws - ${ import.meta.env.VITE_PUSHER_APP_CLUSTER }.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });

// var cssRule = "display:block;width:300px;border-radius: 3px 0 0 3px;padding:3px 15px;background:#ffffff;color:#FFF;font-size: 30px;font-family:Arial, Helvetica, sans-seriffont-weight: bold;";
// var cssRule2 = "display:block;border-radius: 0 3px 3px 0;padding:3px 15px;background:#fff;color:#666;font-size: 30px;font-family:Arial;";
// console.log("%cDevelopment By :" + "%cAlex And", cssRule, cssRule2);
var cssRule = "border-radius: 3px 0 0 3px;padding:3px 15px;background:#000000;color:#fff;font-size: 12px;font-weight: bold;";
var cssRule2 = "border-radius:0px;padding:3px 0px;background:#000000;color:#FF5722;padding-left:0px;font-size: 12px;font-weight: bold;border-radius: 3px";
var cssRule3 = "border-radius: 0 3px 3px 0;padding:3px 15px;background:#35495e;color:#108bc3;font-size: 12px;font-weight: bold;";
console.log("%cThis System Development By Alexandro And Team Contact Us :" + "%c@" + "https://www.instagram.com/lex09.__", cssRule, cssRule2);


