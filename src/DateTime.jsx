import React, { useState, useEffect } from 'react';

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 * 60 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return date;
}

export default DateTime