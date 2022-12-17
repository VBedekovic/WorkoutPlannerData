
export function responseWrap(status, message, response = null) {
    let responseObj = {
        status: status,
        message: message,
        response: response
    }
    return responseObj
}