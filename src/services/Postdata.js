
export const Postdata = (type, userData) => {
    const BaseUrl = "http://backend.faceyourbookapps.com/user/"
    return new Promise((resolve, reject) => {
        fetch(`${BaseUrl}${type}`, {
            method: "post",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

}