import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {
  const { userId, prompt, tag, date} = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag, date});
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new propmt", { status: 500 });
  }
};
