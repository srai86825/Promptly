"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure, you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          console.log("delete: ", response);
          alert("Failed to delete");
        } else {
          setPosts(posts.filter((p) => p._id !== post._id));
        }
      } catch (err) {}
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        if (!response.ok) {
          console.log("response: ", response);
        } else {
          const data = await response.json();
          console.log("fetched posts: ");
          console.log(posts);
          setPosts(data);
        }
      } catch (err) {
        console.log("ERR: Could'nt fetch data from profile: " + err);
      }
    };

    if (session?.user.id) {
      fetchPosts();
    } else {
      console.log("This time session was not defined");
    }
  }, [session]); //it makes the session as dependency, so useEffect will be only called once session is defined
if(session?.user.id)
  return Object.keys(posts).length !== 0 ? (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page!"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  ) : (
    <div className="prompt_card">
      <h3 className="text-lg text-gray-800">
        Explore the world of AI-prompts and unleash your creativity! Start
        sharing captivating stories and ideas to leave a lasting impact on your
        profile.
      </h3>
      <p className="pt-5 text-xl blue_gradient cursor-pointer text-center font-semibold"
      onClick={()=>{router.push("/create-prompt")}}
      >CREATE YOUR FIRST POST</p>
    </div>
  );
  else{
    return <h1 className="text-2xl">Log in to view your profile and unlock its full potential!</h1>
  }
};

export default MyProfile;
