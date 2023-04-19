import React from 'react'

export const useStateSetupHandler = (initalValue: any) => {
    const [state, setState] = React.useState(initalValue);
    const handler = (event: React.ChangeEvent<HTMLInputElement>) => {setState(event.target.value)};
    return {state, setState, handler}
}
