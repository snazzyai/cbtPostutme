import React, { useState } from 'react'


const CardCharge = ({ email, isLoading, }) => {
    const [email, setEmail] = useState(email)

    useEffect(() => {
        console.warn("this is working")
        console.warn(email)
    })

}

export default CardCharge;