import React from "react"; 
import Link from "next/link";
const Form = ({ submitting, handleSubmit, type, post, setPost }) => {
  return (
    <section className="w-full max-w-full flex-star flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-Powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          {" "}
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Write your prompt here..."
            required
          ></textarea>
        </label>

        <label>
          {" "}
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{`  `}
            <span className="font-normal">(#WebDevelopment, #idea, #Art)</span>
          </span>
          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
            required
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/"> Cancel</Link>
          <button
            className="px-5 py-1.5 bg-primary-orange text-white rounded-full"
           type="submit" disabled={submitting}
          >{submitting?`${type}...`:type}</button>
        </div>
      </form>
    </section>
  );
};
export default Form;
