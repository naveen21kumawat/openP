// import { useState } from "react";
import "./App.css";
// import CreatePost from "./Components/CreatePost";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
// import PostList from "./Components/PostList";
import { Outlet} from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import PostListProvider from "./Store/post-list-store";

function App() {

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar  />
        <div className="content">
          <Header />
          {/* {selectedTab === "Home" ? <PostList /> : <CreatePost />} */}
          <Outlet  />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
