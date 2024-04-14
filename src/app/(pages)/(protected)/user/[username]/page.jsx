"use client";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import ProfilePage from "../../components/ProfilePage";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import {notFound} from "next/navigation";

const UserProfilePage = ({ params }) => {
  const [pending, startTransition] = useTransition();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  function triggernotfound(){
    "use session"
    notFound();
  }
  useEffect(() => {
    startTransition(async () => {
      const res = await axios.post("/api/users/details", {
        username: params.username,
      });
      if (!res.data.user) {
        triggernotfound();
      }
      setUser(res.data.user);
    });
  }, []);
  return (
    <>
      {error ? (
        <></>
      ) : (
        <>
          {user && <ProfilePage user={user} status={true}></ProfilePage>}
        </>
      )}
    </>
  );
};

export default UserProfilePage;
