import React, { FC, useEffect, useState } from 'react'
import { resultsStore } from './generateResults'

const redDiceStyle = {
    color: 'red',
    fontSize: 90 
};

const blackDiceStyle = {
    color: 'black',
    fontSize: 110
};

const containerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export const App: FC = () => {

    const [results, setResults] = useState(resultsStore.getResult());

    useEffect(() => {
        const handler = () => setResults(resultsStore.getResult());
        resultsStore.onChange(handler);
        return () => resultsStore.offChange(handler);
    })

    const onClick = () => resultsStore.next();

    return (
        <div onClick={onClick} style={containerStyle}>
            {/* https://dicefont.com */}
            <i className={`df-solid-small-dot-d6-${results[0]}`} style={redDiceStyle}/>
            <i className={`df-d8-${results[1]}`} style={blackDiceStyle}/>
        </div>
    )
};
