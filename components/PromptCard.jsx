"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  let pathname = usePathname();
  let router = useRouter();
  let { data: session } = useSession();
  let [copied, setCopied] = useState("");
  let handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  //edirect to UserProfile
  let handleProfile = () => {
    console.log("UserProfile", prompt);
    console.log("UserSession", session);
    if (session?.user.id === prompt?.creator._id)
      return router.push("/profile");

    router.push(
      `/profile/${prompt.creator._id}?name=${prompt.creator.username}`
    );
  };

  return (
    <div className={pathname === "/" ? "prompt_card" : "prompt_card h-[300px]"}>
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfile}
        >
          <Image
            src={prompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            width={12}
            height={12}
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 h-[50px]">
        {prompt.prompt}
      </p>
      <div className="flex justify-between items-center mt-7">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick(prompt.tag)}
        >
          {prompt.tag}
        </p>

        <WhatsappShareButton
          url={"https://promptopia-chats.vercel.app/"}
          title={prompt.prompt}
          separator="--"
        >
          <WhatsappIcon size={28} round />
        </WhatsappShareButton>
      </div>
      {session?.user.id === prompt.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4  border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
