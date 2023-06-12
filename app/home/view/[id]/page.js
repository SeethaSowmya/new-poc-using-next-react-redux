"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      let maindata = (
        await axios(
          `https://jsonplaceholder.typicode.com/posts/${pathname.split("/")[3]}`
        )
      ).data;
      setData(maindata);
    };

    getPostData();
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <p>{data.userId}</p>
    </div>
  );
};

export default ViewPage;
