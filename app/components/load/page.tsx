'use client';
import React,{useState}  from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Button} from "@/imcomponents/ui/button";
import CircularProgress from '@mui/material/CircularProgress';
/*
export const config = {
  route: '/boss'
}
*/

export default function Boss(){

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <div>
        <div>
          <Button onClick={handleOpen}>Load Button</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
        <div>

          
        </div>


      </div>
    )
    
}
