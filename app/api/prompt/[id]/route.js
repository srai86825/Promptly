import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET(read), PATCH(update), DELETE(delete)

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    // console.log("promptId from back", params.id);

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });
    // console.log("prompt from back", prompt);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log("error fetching prompt backend: " + err);
    return new Response("Failed to fetch prompt in backend", {
      status: 500,
    });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await req.json();
    const existingPrompt = await Prompt.findById(params.id);
    console.log("patching: ", params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    console.log("could'nt update prompt");
    return new Response("Unable to update prompt", { status: 500 });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  console.log("received promptID for deletion: " + params.id);
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Deleted Successfully!", { status: 200 });
  } catch (err) {
    console.log("error deleting backend: ", err);
    return new Response("Cound'nt delete", { status: 500 });
  }
};
