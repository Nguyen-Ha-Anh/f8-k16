"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
};

export function DeletePostButton({ postId}: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;
    await axios.delete(`https://dummyjson.com/posts/${postId}`);
    router.refresh();
  };

  return (
    <Button className="cursor-pointer" variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
