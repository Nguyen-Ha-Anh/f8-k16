import { useState } from "react";
import { Input } from "../ui/input";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error?: string;
  value: string;
  name: Path<T>
}

export default function PasswordInput<T extends FieldValues>({
  register,
  error,
  value,
  name,
}: PasswordInputProps<T>) {

  const [show, setShow] = useState<boolean>(false);

  //   const [value, setValue] = useState('')

  return (
    <div className="relative">
      {/* input */}
      <Input
        id={name}
        type={show ? "text" : "password"}
        placeholder=" "
        {...register(name, {
          required: true,
          minLength: 8
        })}
        className="peer h-[40px] w-full bg-background border border-[#363636]
        text-foreground text-sm px-3 pt-5 rounded-sm
        focus:outline-none
        placeholder-transparent mb-1"
      />

      {/* label */}
      <label
        htmlFor={name}
        className="absolute left-3 top-3 text-[#a8a8a8] text-sm
        transition-all duration-200 cursor-text
        peer-focus:top-1 peer-focus:text-xs
        peer-not-placeholder-shown:top-1
        peer-not-placeholder-shown:text-xs"
      >
        Password
      </label>

      {/* show / hide */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2
        text-sm text-foreground font-semibold"
        >
          {show ? "Hide" : "Show"}
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
