const contextObj = 
    {
        "@context": {
            "@vocab": "http://schema.org/",
            "workout_type": "exerciseType",
            "weekday": "dayOfWeek"
        }
    }



export function responseWrap(status, message, response = null) {
    if (Array.isArray(response)) {
        for (let i = 0; i < response.length; i++) {
            response[i] = 
                {
                    ...contextObj,
                    ...response[i]
                }
        }
    } else if (response) {
        response = {
            ...contextObj,
            ...response
        }
    }


    let responseObj = {
        status: status,
        message: message,
        response: response
    }
    return responseObj
}