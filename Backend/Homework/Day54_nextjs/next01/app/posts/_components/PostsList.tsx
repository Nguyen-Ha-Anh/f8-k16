
import axios from "axios";
import Link from "next/link";
import { EditPostButton } from "./EditPostButton";
import { DeletePostButton } from "./DeletePostButton";
import { AddPostButton } from "./AddPostButton";

type Post = {
  id: number;
  title: string;
  body: string;
};

const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios(`https://dummyjson.com/posts`);
    return response.data.posts;
  } catch {
    throw new Error("co loi khi goi posts");
  }
};
export default async function PostsList() {
  const posts = await getPosts();
  return (
    <div>
      <AddPostButton/>

      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-[80%] mx-auto m-6 border border-[#bbb] p-6 rounded rounded-lg"
        >
          <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
          <p>{post.body}</p>

          <div className="mt-5 flex justify-between items-center">
            <Link href={`/posts/${post.id}`}>
              <button className="cursor-pointer hover:text-blue-600">
                Details
              </button>
            </Link>
            <div className="flex gap-2">
              <EditPostButton
                postId={post.id}
                currentTitle={post.title}
                currentBody={post.body}
              />
              <DeletePostButton postId={post.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
