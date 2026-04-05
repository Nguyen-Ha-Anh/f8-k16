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

export function AddPostButton() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();

  const handleAdd = async () => {
    if (!title || !body) return;
    await axios.post("https://dummyjson.com/posts/add", { title, body, userId: 1 });
    setTitle("");
    setBody("");
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 cursor-pointer">Add post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add post</DialogTitle>
          <DialogDescription>Do something..</DialogDescription>
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
          <Button className="cursor-pointer" onClick={handleAdd}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}