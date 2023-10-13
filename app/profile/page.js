"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  let { data: session } = useSession();
  let [prompts, setPrompts] = useState([]);
  let router = useRouter();
  useEffect(() => {
    const fetchPrompts = async () => {
      let response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();

      setPrompts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, [session?.user.id]);

  const handleEdit = async (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPrompt = prompts.filter((p) => prompt._id !== p._id);
        setPrompts(filteredPrompt);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
