//import { Button, Box } from "@chakra-ui/react";
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader} from "@nextui-org/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Quote from "./components/quote/page";
import Boss from "./components/boss/page";


export default function Index() {

  return (
    <div className=" items-center">
      <p className='flex justify-center '>Button</p>
      <div className="flex-col">
        <TabGroup aria-label="Options">
          <Tab key="Quote" title="Quote">
            <Card>
              <CardBody>
                <Quote />
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="Load" title="Load">
            <Card>
              <CardBody>
                <Boss></Boss>
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="videos" title="Videos">
            <Card>
              <CardBody>
                videos
              </CardBody>
            </Card>  
          </Tab>
        </TabGroup>
      </div>  
        
    </div>
  );
};