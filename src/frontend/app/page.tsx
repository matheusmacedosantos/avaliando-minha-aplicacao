'use client'
import FirstCard from "./components/FirstCard";
import IntroCard from "./components/IntroCard";
import TableFeedback from "./components/TableFeedback";
import UploadCard from "./components/UploadCard";
import { Toaster } from "react-hot-toast";

import { useState } from "react";

export default function Home() {

  const [uploaded, setUploaded] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([])

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}>
        <FirstCard />
        <IntroCard /> 
        {
          !uploaded ? <UploadCard uploaded={uploaded} setUploaded={setUploaded} data={data} setData={setData}/>
          : <TableFeedback uploaded={uploaded} setUploaded={setUploaded} data={data} setData={setData}/> 
        }

        <Toaster
          containerClassName="toaster"
          position="bottom-center"
          reverseOrder={false}
        />


      </div>
    );
}
