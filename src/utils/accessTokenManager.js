let accessToken = null;

export const setAccessToken = (token) => {
    console.log(token, 'tttttt')
    console.log(accessToken, 'aaaaaaattttt')
    accessToken = token
}

export const getAccessToken = () => {
    console.log('aaaaaaa', accessToken)
    return accessToken
}

export const clearAccessToken = () => {
    console.log('rrrrrrrrr')
    accessToken = null
}