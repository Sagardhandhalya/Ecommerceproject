import React from 'react'
import { CircularProgress, Box } from '@material-ui/core'


function Loder() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="30vh" >
            <CircularProgress color="secondary" />
        </Box>
    )
}

export default Loder
