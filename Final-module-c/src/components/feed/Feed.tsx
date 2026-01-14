import PostList from "./PostList";
import Story from "./Stories";

export default function Feed() {
  return (
    <div className="flex flex-col gap-6">
      <Story />
      <PostList />
    </div>
  );
}
