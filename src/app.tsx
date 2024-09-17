import React, { FC, useEffect, useRef, useState } from 'react'
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

    const timeoutId = useRef<number>();

    const animate = (doneCallback: () => void) => {
        if (timeoutId.current) return;

        let [r, b] = results;
        let count = 0;

        const step = () => {
            setResults([r, b]);
            r = r % 6 + 1;
            b = r % 8 + 1;
            count++;
            if (count > 6) {
                doneCallback();
                timeoutId.current = undefined;
            } else {
                timeoutId.current = setTimeout(step, 100);
            }
        };

        timeoutId.current = setTimeout(step, 100);
    }

    useEffect(() => {
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        }
    }, [])

    useEffect(() => {
        const handler = () => setResults(resultsStore.getResult());
        resultsStore.onChange(handler);
        return () => resultsStore.offChange();
    }, [])

    const onClick = () => {
        animate(() => {
            resultsStore.next();
        });
    }

    return (
        <div onClick={onClick} style={containerStyle}>
            {/* https://dicefont.com */}
            <i className={`df-solid-small-dot-d6-${results[0]}`} style={redDiceStyle}/>
            <i className={`df-d8-${results[1]}`} style={blackDiceStyle}/>
        </div>
    )
};
