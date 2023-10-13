"use client";
import Form from "@components/Form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
  let router = useRouter();
  let searchParam = useSearchParams();
  let promptId = searchParam.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    let getPromptData = async () => {
      let response = await fetch(`/api/prompt/${promptId}`);
      let data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptData();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("PromptId not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,

          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdatePrompt;
