import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    if (prompts.length === 0) {
      return new Response(JSON.stringify({ message: "No prompts found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch all prompts",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
