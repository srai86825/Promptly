import React from "react";
import Feed from "@components/Feed";
function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Unlock Limitless Inspiration with Promply: Your AI-Powered Prompt
        Generator for Boundless Creative Exploration!
      </p>
      <Feed />
    </section>
  );
}
export default Home;
