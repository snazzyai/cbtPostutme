

export const Postdata = (type, userData) => {
    const BaseUrl = "http://backend.faceyourbookapps.com/user/"

    return new Promise((resolve, reject) => {
        fetch(BaseUrl + type, {
            method: POST,
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })

}