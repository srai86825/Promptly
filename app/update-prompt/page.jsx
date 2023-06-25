"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setsubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
    //   console.log("promptId from front", promptID);
      const response = await fetch(`/api/prompt/${promptID}`);
      if (!response.ok) {
        console.log(response);
      } else {
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
        // console.log(data);
      }
    };
    if (promptID) getPromptDetails();
  }, [promptID]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    if (!promptID) {
      alert("PromptID not Found!!");
    }
    try {
      const res = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        alert("error occured in update-page page.js");
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
      handleSubmit={updatePrompt}
      type="Edit"
      post={post}
      setPost={setPost}
    />
  ) : (
    <h1 className="text-center head_text">Login First to create prompt</h1>
  );
};
export default UpdatePrompt;
