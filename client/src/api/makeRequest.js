import config from '../config.json'

async function makeRequest(requestConfig,body) {
    const ibsession = localStorage.getItem('ibsession');
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password')
    try {
        const promise =  await fetch(config.serverUrl+requestConfig.url,{
            method:requestConfig.method,
            headers: {
                'Content-Type': 'application/json',
                ibsession:ibsession,
                login:encodeURIComponent(login),
                password:password,
            },
            body :JSON.stringify(body)
        });

      return await promise.json()

    } catch (error) {
        console.log(error)
    }
}
export default makeRequest