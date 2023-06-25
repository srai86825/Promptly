import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="flex flex-col mt-7">
      <p className="text-sm text-gray-600">
        Made with ❤️ by
        <Link href="https://www.linkedin.com/in/saurabhkumarrai/">
          {" "}
         <span className="blue_gradient"> Saurabh!</span>
        </Link>
      </p>
      <div className="ai pt-3 flex flex-row gap-10 flex-center grayscale">
        <Link href={"https://chat.openai.com/"}>
          <Image
            className="rounded-full"
            src="/assets/icons/chatgpt.svg"
            height={22}
            width={22}
            alt="chatgpt_logo"
          />
        </Link>
        <Link href={"https://www.bing.com/"}>
          <Image
            className="rounded-full"
            src="/assets/icons/bing.svg"
            height={18}
            width={18}
            alt="bing_logo"
          />
        </Link>
        <Link href={"https://bard.google.com/"}>
          <Image
            className="rounded-full"
            src="/assets/icons/bard.svg"
            height={50}
            width={50}
            alt="bard_logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
