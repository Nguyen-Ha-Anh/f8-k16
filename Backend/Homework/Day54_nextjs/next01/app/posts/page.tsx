import { AddPostButton } from "./_components/AddPostButton";
import PostsList from "./_components/PostsList";

export default function PostsPage() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Posts List</h1>
      <PostsList/>
    </div>
  )
}
