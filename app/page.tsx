//import { Button, Box } from "@chakra-ui/react";
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader} from "@nextui-org/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Quote from "./components/quote/page";
import Boss from "./components/load/page";


export default function Index() {

  return (
    <div className=" items-center">
      <p className='flex justify-center '>Button</p>
      <div className="flex-col">
        <p >Where to go.</p>
      </div>  
        
    </div>
  );
};