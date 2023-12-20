import Link from "next/link";

const PostForm = ({ type, post, setPost, submit, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label className="text-center">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            ventilation station
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="what's brewing in your mind?"
            required
            className="form_textarea text-center"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submit}
            onClick={() => setPost({ ...post, date: Date() })}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submit ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
