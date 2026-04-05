import axios from "axios";

type Props = {
  params: Promise<{ id: number }>;
};

type Post = {
  id: number;
  title: string;
  body: string;
};

const getPostsDetail = async (id: number): Promise<Post> => {
  try {
    const response = await axios(`https://dummyjson.com/posts/${id}`);
    return response.data
  } catch {
      throw new Error("co loi khi goi posts detail");
  }
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const postDetail = await getPostsDetail(id)
  return (
    <div className="max-w-[80%] mx-auto m-6 p-6 border rounded-lg">
      <h1 className="text-3xl font-bold">{postDetail.title}</h1>
      <p className="mt-4">{postDetail.body}</p>
      <a href="/posts" className="mt-6 inline-block text-blue-600 hover:underline">
        Back
      </a>
    </div>
  );
}

