"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useRouter, useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  let [prompts, setPrompts] = useState([]);
  let router = useRouter();
  let searchParam = useSearchParams();
  let userName = searchParam.get("name");
  console.log(userName);
  useEffect(() => {
    const fetchPrompts = async () => {
      let response = await fetch(`/api/users/${params?.id}/prompts`);
      const data = await response.json();

      setPrompts(data);
    };
    if (params?.id) fetchPrompts();
  }, [params?.id]);

  console.log("User prompts", prompts);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personal profile page where you can see ${userName}'s prompts`}
      data={prompts}
    />
  );
};

export default UserProfile;
