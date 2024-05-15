'use client';
import React from 'react';
import {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Button} from "@/components/ui/button";
import CircularProgress from '@mui/material/CircularProgress';
export const config = {
  route: '/boss'
}

const boss = () => {

 

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
    const handleOpen = () => {
      setOpen(true);
    };

    return (
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
    )
    
}
export default boss;