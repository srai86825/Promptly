import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { tag, prompt, userID } = await req.json();
  try {
    await connectToDB();
    console.log("connected successfully");
    const newPrompt = new Prompt({
      creator: userID,
      tag,
      prompt,
    });
    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log("ERR: in creating prompt, " + err);
    return new Response("failed to create prompt", { status: 500 });
  }
};
