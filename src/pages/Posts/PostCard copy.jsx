// React Imports
import { useState, useEffect } from "react";

// MUI Imports
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

const baseUrl = "https://tarmeezAcademy.com/api/v1";

const LoadingFallback = () => (
  <Box className="loading-fallback flex justify-center items-center min-h-[60vh]">
    <CircularProgress color="primary" size="2.5rem" />
  </Box>
);

const PostCard = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Functions
  async function getPosts(page = 1) {
    const url = `${baseUrl}/posts?limit=6&page=${page}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      setPosts(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, [posts]);

  return (
    <div className="mx-auto space-y-4">
      {loading ? (
        <LoadingFallback />
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded shadow p-3">
            <div className="flex items-center mb-2">
              <img
                src={post.author?.profile_image}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2 border"
              />
              <span className="font-semibold text-sm">{post.author?.name}</span>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="rounded mb-2 w-full h-56 object-cover"
              />
            )}
            <div className="text-xs text-gray-500 mb-1">{post.created_at}</div>
            <div className="text-sm mb-2">{post.body}</div>
            <div className="text-xs text-blue-500 cursor-pointer">
              Comments ({post.comments_count})
            </div>
          </div>
        ))
      )}

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default PostCard;
