/* eslint-disable react/prop-types */
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostListData } from "../Store/post-list-store";
import { MdAddReaction } from "react-icons/md";

function Post({postData}) {
  const { deletePost } = useContext(PostListData);
  return <>
  <div className="card post-card" >
  <div className="card-body">
  <img src={postData.image} className="card-img-top image-style" alt="This is a image"  />

    <h5 className="card-title">{postData.title}
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>deletePost(postData.id)}>
    <MdDelete/>
  </span>
    </h5>
    <p className="card-text">{postData.body}</p>
    {postData.tags.map((tag)=>(
      <span key={tag} className="badge text-bg-primary hashtag">{tag}</span>
    ))}
      
  </div>
  <div className="alert alert-success reactions" role="alert">
<MdAddReaction/>
   This post has been reacted by {postData.reactions.likes} people
</div>

</div>
  </>
}

export default Post;
