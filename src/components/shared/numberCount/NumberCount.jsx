import React, { useEffect, useState } from 'react';

const NumberCount = ({target,duration}) => {
    const [count,setCount] = useState(0);
    useEffect(() => {
        const start = 0;
        const end = target;
        const range = end - start;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;

        const timer = setInterval(() => {
            current += 1;
            setCount(current);
            if (current === end) {
                clearInterval(timer);
            }
        },stepTime)

        return () => clearInterval(timer);
    },[target,duration])
    return (
        <div>
            {count}+
        </div>
    );
};

export default NumberCount;