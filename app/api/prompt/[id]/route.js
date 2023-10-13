import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";

//GET (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    let prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 400 });
    }
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to get the prompt", { status: 500 });
  }
};

//PATCH (update)
export const PATCH = async (request, { params }) => {
  let { prompt, tag } = await request.json();
  try {
    await connectToDB();
    let existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 400 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

//DELETE (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    let deletingPrompt = await Prompt.findByIdAndDelete(params.id);

    return new Response(JSON.stringify(deletingPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
