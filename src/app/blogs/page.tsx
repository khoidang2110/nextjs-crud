'use client'

import TableExample from "@/components/app.table";
import useSWR from "swr";

const BlogsPage = ()=>{

    const fetcher = (url:string)=> fetch(url)
.then((res)=>res.json());

const { data, error, isLoading } = useSWR("http://localhost:8000/blogs", fetcher,{
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
})

console.log("swr data",data)
if(isLoading){
  return <div>loading...</div>
}
    return (
        <div className="mt-3">
           <TableExample blogs={data?.sort((a:any,b:any)=>b.id-a.id) ??  []}/>
        </div>
    )
}

export default BlogsPage;