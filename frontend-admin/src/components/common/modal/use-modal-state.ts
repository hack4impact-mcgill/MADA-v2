import React from 'react'

export const useModalState = () => {
    const [state, setState] = React.useState(false);
    const handleOpen = () => setState(true);
    const handleClose = () => setState(false);
    return {state, handleOpen, handleClose}
}
