"use client"

import { useStateContext } from '../context/StateContext';
import { Backdrop, CircularProgress} from '@mui/material';

export default function BackDrop() {

    const { loading } = useStateContext();

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop> 
    )
}