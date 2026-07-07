import React from "react";

const Title = ({ title, subTitle, align = "center" }) => {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <h1 className="font-playfair text-3xl text-slate-900 md:text-[40px]">
        {title}
      </h1>
      {subTitle && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default Title;
