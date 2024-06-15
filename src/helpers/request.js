async function handleRequest(request, throwError = false) {
    if (!throwError) {
        try {
            return await request
        } catch (error) {
            console.log(error)
            return error
        }
    }
    return request
}


export {
    handleRequest
}