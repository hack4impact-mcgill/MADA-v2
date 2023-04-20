import React from 'react'
import {Container, Box} from '@mui/material';
import BasePage from 'src/components/common/base-page'
import {PageActionBar, ActionProps} from 'src/components/common/page-actionbar'
import {ModalControl, ModalControlProps} from 'src/components/common/modal/control';
import { BaseGridProps, BaseGrid } from './base-grid';

type GridPageProps = {
    actionBarProps: ActionProps[],
    modalControls: ModalControlProps[],
    gridCondition: boolean,
    gridProps: BaseGridProps
}

const GridPage = (props: GridPageProps) => {
    const {actionBarProps, modalControls, gridCondition, gridProps} = props

    return (
        <BasePage>
            <Container sx={{width: '100%', height: '100vh'}} maxWidth={false}>
                <PageActionBar actions={actionBarProps}/>

                {
                    modalControls.map((modalControlProps, index) => {
                        return <ModalControl key={index} {...modalControlProps}/>
                    })
                }

                {
                    gridCondition ? <Box>Loading...</Box> :
                    <BaseGrid {...gridProps} />
                }
            </Container>
        </BasePage>
    )
}

export default GridPage;