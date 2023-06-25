"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setsubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const createPrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userID: session?.user.id,
        }),
      });
      if (res.ok) {
        router.push("/");
      } else { 
        alert("error occured in create-page page.js");
        console.log(res);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setsubmitting(false);
    }
  };

  return session?.user.id ? (
    <Form
      submitting={submitting}
      handleSubmit={createPrompt}
      type="Create"
      post={post}
      setPost={setPost}
    />
  ) : (
    <h1 className="text-center head_text">Login First to create prompt</h1>
  );
};
export default CreatePrompt;
