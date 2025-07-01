import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import { Card, CardHeader, CardContent, Divider, Box } from "@mui/material";

import UseList from "../UseList";
import CardSkeleton from "./CardSkeleton";

const listData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
  { id: 5, name: "Charlie White" },
];

function TestSkeleton() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Ibrahim Al-Zilah",
        avatar: "https://i.pravatar.cc/150?img=3",
      });
      setLoading(false);
    }, 1000); // Simulate 1s loading
  }, []);

  return (
    <>
      <CardSkeleton loading={loading} />
      <Card className="mx-auto text-start" sx={{ maxWidth: 345 }}>
        <CardHeader
          className="flex items-center gap-2"
          avatar={
            loading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                src={user.avatar}
                alt="avatar"
                sx={{ width: 40, height: 40, borderRadius: "50%" }}
              />
            )
          }
          title={
            loading ? (
              <Skeleton variant="text" width={"100%"} />
            ) : (
              <h4>{user.name}</h4>
            )
          }
        />
        <Divider />
        <CardContent>
          <UseList data={listData} loading={loading} />
        </CardContent>
      </Card>
    </>
  );
}

export default TestSkeleton;
