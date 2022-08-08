import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";

export default function SingleContact(): JSX.Element {
  const router = useRouter();
  const [contact, setContact] = useState(undefined);

  const getContact = useCallback(
    async (id: any) => {
      try {
        const res = await axios.get(`http://localhost:1337/passenger/${id}`);
        if (res.status == 200) {
          setContact(res.data);
        // console.log(res.data)
        }
      } catch (e) {
        const err = e as AxiosError;
        console.warn(err);
      }
    },
    [contact]
  );

  useEffect(() => {
    const id = router.query;
    getContact(id.data);
  }, [setContact]);

  return <div>HELLO</div>;
}
