import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  label: string;
  disabled: boolean;
}

export default function SubmitButton({ label, disabled }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className={`w-full font-semibold py-2 rounded-lg mb-4 transition text-white
        ${
          disabled
            ? "bg-[#4A5DF9] cursor-not-allowed"
            : "bg-[#4A5DF9] hover:bg-[#4451c7]"
        }
      `}
    >
      {label}
    </Button>
  );
}
