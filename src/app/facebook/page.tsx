'use client'

import { useRouter } from "next/navigation"
import { Button } from "react-bootstrap";

const Facebook = () =>{
    const router = useRouter()
    const handleBtn = ()=>{
      router.push('/')
    }
    return (
   <div>
    facebook page
    <div>
        <Button variant="danger"> bootstrap</Button>
        <button onClick={()=>handleBtn()}>back home</button>
    </div>
   </div>
    )
    }
    
    export default Facebook;