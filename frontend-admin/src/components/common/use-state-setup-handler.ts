import React from 'react'

export const useStateSetupHandler = (initalValue: any) => {
    const [state, setState] = React.useState(initalValue);
    const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (initalValue === false) {
            setState(event.target.checked)
        } else {
            setState(event.target.value)
        }
    };
    return {state, setState, handler}
}
