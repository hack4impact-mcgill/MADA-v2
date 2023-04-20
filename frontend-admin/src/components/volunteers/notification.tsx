import React from 'react'
import BaseModal from 'src/components/common/modal/modal'
import {useStateSetupHandler} from 'src/components/common/use-state-setup-handler';

const NotificationModalContents = (props: {handleClose: any}) => {
    const {state: message, handler: handleMessageChange} = useStateSetupHandler('');
    
    const handleSend = () => {
        console.log("send")
        props.handleClose()
    }
    
    const handleCancel = () => {
        props.handleClose()
    }

    return (
        <BaseModal
            title={"Create new notification"}
            modalActionBarProps={{
                primaryActionProps: {
                    handlePrimary: handleSend,
                    labelPrimary: "Send"
                },
                secondaryActionProps: [
                    {
                        handle: handleCancel,
                        label: "Cancel"
                    }
                ]
            }}
            modalInputProps={[
                {
                    label: "Message",
                    type: "multiline",
                    stateValue: message,
                    stateSetter: handleMessageChange
                },
            ]}
        />
    )
}

export default NotificationModalContents;