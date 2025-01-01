import { useContext, useRef } from "react";
import { PostListData } from "../Store/post-list-store";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { addPost } = useContext(PostListData);

  const navigate = useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();
  const imageElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    const image = imageElement.current.value;
    // addPost(userId, postTitle, postBody, reactions, tags,image);

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
    imageElement.current.value = "";

    try {
      fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          title: postTitle,
          body: postBody,
          reactions: reactions,
          tags: tags,
          image: image,
          /* other product data */
        }),
      })
        .then((res) => res.json())
        .then((post) => {
          console.log("Server Got ", post);
          addPost(post);
          navigate("/");
        });
      } catch (e) {
        console.log("Error g ", e);
        navigate("/");
    }

    
  };
  return (
    <>
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            ref={userIdElement}
            placeholder="Enter Your User ID"
            type="text"
            className="form-control"
            id="userId"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            ref={postTitleElement}
            placeholder="Enter Your Title"
            type="text"
            className="form-control"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Add A Image
          </label>
          <input
            ref={imageElement}
            placeholder="paste image address"
            type="img"
            className="form-control"
            id="image"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            rows={4}
            ref={postBodyElement}
            placeholder="tell us more about it "
            type="text"
            className="form-control"
            id="body"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Number Of Reactions
          </label>
          <input
            ref={reactionsElement}
            placeholder="How may people reacted to your post"
            type="text"
            className="form-control"
            id="reactions"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            tags
          </label>
          <input
            ref={tagsElement}
            placeholder="Please enter tags separated by comma "
            type="text"
            className="form-control"
            id="tags"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
}

export default CreatePost;
