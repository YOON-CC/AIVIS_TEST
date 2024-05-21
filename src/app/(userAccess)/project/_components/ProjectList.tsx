"use client";

import { useEffect, useState } from "react";

export default function ProjectList() {
  const [token, setToken] = useState<string | null>(null);
  const [shortTermToken, setShortTermToken] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedShortTermToken = localStorage.getItem("shortTermToken");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedShortTermToken) {
      setShortTermToken(storedShortTermToken);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/project.json`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setData(data);
            console.log(data);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <main>
      <div>
        <h1>Project List</h1>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <p>name</p>
          <p>number of images</p>
          <p>created</p>
        </div>
        {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>} */}
      </div>
    </main>
  );
}
