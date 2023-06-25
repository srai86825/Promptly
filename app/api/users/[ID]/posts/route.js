import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    // console.log("I GOT ASKED FOR POSTS OF PROFILE: "+params.ID)
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.ID }).populate("creator");
    
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log("error fetching user's posts in backend: " + err);
    return new Response("Failed to fetch user's posts in backend", { status: 500 });
  }
};
  