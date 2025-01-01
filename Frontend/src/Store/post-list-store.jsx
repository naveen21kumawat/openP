/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostListData = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  spiner: false,
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = newPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
    // const newPostData= action.payload;
    // localStorage.setItem('postList',JSON.stringify(newPostData))
    // console.log(newPostData)
    // const getdata=localStorage.getItem('postList',JSON.stringify(newPostData))
    // console.log(getdata)
  } else if (action.type === "ADD_INITIAL_POSTS") {
    const apiData = action.payload.post;
    newPostList = apiData;
    // console.log(newPostList);
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
    // console.log("Received", post);    
  };
  // const addPost = (userId, postTitle, postBody, reactions, tags, image) => {
  //   dispatchPostList({
  //     type: "ADD_POST",
  //     payload: {
  //       id: Date.now(),
  //       userId: userId,
  //       title: postTitle,
  //       body: postBody,
  //       reactions: reactions,
  //       tags: tags,
  //       image: image,
  //     },
  //   });
  // };

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId: postId,
        },
      });
      console.log("delete post for id: ", postId);
    },
    [dispatchPostList]
  );

  // const arr = [ 1,2,3,4,5];
  // useEffect(()=>{
  //   // useMemo(()=> console.log(arr.sort()),[arr]);
  //   console.log(arr.sort())
  // },[])

  const AddInitialPost = useCallback(
    (post) => {
      dispatchPostList({
        type: "ADD_INITIAL_POSTS",
        payload: {
          post,
        },
      });
    },
    [dispatchPostList]
  );

  const [spiner, setSpin] = useState(false);
  useEffect(() => {
    let fetchApi = async () => {
      try {
        setSpin(true);
        const controller = new AbortController();
        const signal = controller.signal;
        let data = await fetch("http://localhost:3000/", { signal });
        let newData = await data.json();
        // console.log(newData);
        AddInitialPost(newData);
        setSpin(false);
      } catch (e) {
        setSpin(false);
        console.log("Failed to  Fetch data",e);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <PostListData.Provider value={{ postList, addPost, deletePost, spiner }}>
        {children}
      </PostListData.Provider>
    </>
  );
};
// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Post 1",
//     body: "This is post 1.",
//     userId: " user03",
//     reactions: 0,
//     image:
//       "https://images.pexels.com/photos/1535288/pexels-photo-1535288.jpeg?auto=compress&cs=tinysrgb&w=600",
//     tags: ["vacation ", "mumbai", "Enjoying"],
//   },
//   {
//     id: "2",
//     title: "Pass ho gaye bahii",
//     body: "3 saal ki masti k ebaad pass ho gayi",
//     reactions: 2,
//     image:
//       "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",

//     userId: " user02",
//     tags: ["vacation ", "mumbai", "Enjoying"],
//   },
// ];
export default PostListProvider;
