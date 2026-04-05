"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
  currentTitle: string;
  currentBody: string;
};

export function EditPostButton({ postId, currentTitle, currentBody}: Props) {
  const [title, setTitle] = useState(currentTitle);
  const [body, setBody] = useState(currentBody);

  const router = useRouter();

  const handleEdit = async () => {
    if (!title || !body) return;
    await axios.put(`https://dummyjson.com/posts/${postId}`, { title, body });
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>Do something...</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field>
            <Label>Body</Label>
            <Input value={body} onChange={(e) => setBody(e.target.value)} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="cursor-pointer" onClick={handleEdit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}