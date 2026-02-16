import React from "react";
import cn from "classnames";
interface IInput {
  inputType?: "input" | "textarea";
  label?: string;
  rows?: number;
  className?: string;
}

const Input = ({ className, inputType = "input", label, rows }: IInput) => {
  return (
    <div className={cn("w-full", className)}>
      {inputType == "textarea" && (
        <label className="text-white font-frankfurter text-base">{label}</label>
      )}

      {inputType == "input" ? (
        <input
          className="w-full outline-0 placeholder:text-white font-frankfurter text-white border-b-2 border-b-white"
          placeholder={label}
        />
      ) : (
        <textarea
          rows={rows}
          className="outline-0 rounded-lg p-3 text-white font-frankfurter w-full border-2 border-white appearance-none"
        ></textarea>
      )}
    </div>
  );
};

export default Input;
