import Prompt from "@models/promptModel";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    let prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response("Failed to get the prompts", { status: 500 });
  }
};
