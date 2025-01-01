import { useContext,  } from "react";
import Post from "./Post";
import { PostListData } from "../Store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import Spinner from "./Spinner";

function PostList() {
  const { postList,spiner } = useContext(PostListData);

  // console.log(postList)
  return (
    <>
      {spiner && <Spinner />}
      {postList.length === 0 && <WelcomeMessage />}
      {postList.map((postData) => (
        <Post key={postData.id} postData={postData} />
      ))}
    </>
  );
}

export default PostList;
