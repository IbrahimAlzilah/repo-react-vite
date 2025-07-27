import { useState, useEffect, useRef } from "react";
import axios from "axios";
// MUI Imports
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Typography from "@mui/material/Typography";

// Components
import CustomDialog from "../../components/mui/dialogs/CustomDialog";
import PostCard from "./PostCard";
import AddPost from "./Edit";
const baseUrl = "https://tarmeezAcademy.com/api/v1";

// Custom hook to handle infinite scrolling logic
const useInfiniteScroll = (callback) => {
  const observer = useRef();
  const lastElementRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback]);

  return lastElementRef;
};

// Loading and Error Fallback Components
const LoadingFallback = () => (
  <Box className="loading-fallback flex justify-center items-center min-h-[60vh]">
    <CircularProgress color="primary" size="2.5rem" />
  </Box>
);

const ErrorFallback = ({ message }) => (
  <Box className="error-fallback flex flex-col justify-center items-center min-h-[60vh]">
    <ErrorOutlineIcon color="error" fontSize="large" />
    <Typography variant="h6" color="textSecondary" className="mt-2">
      {message}
    </Typography>
  </Box>
);

const Posts = () => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Functions
  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    const url = `${baseUrl}/posts?limit=6&page=${page}`;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      const newPosts = response.data.data;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newPosts.length > 0);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const lastElementRef = useInfiniteScroll(fetchPosts);

  useEffect(() => {
    fetchPosts();
  }, []); // Initial fetch on component mount

  // Conditional Rendering
  if (error) {
    return <ErrorFallback message={error} />;
  }

  const handleAddPost = () => {
    console.log("im adding post");
  };

  const handleOpenDailog = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="mx-auto space-y-4">
        {posts.map((post, index) => {
          // Attach ref to the last post for infinite scrolling
          const isLastPost = index === posts.length - 1;
          return (
            <PostCard
              key={index}
              post={post}
              isLastPost={isLastPost}
              lastElementRef={isLastPost ? lastElementRef : null}
            />
          );
        })}

        {loading && <LoadingFallback />}
        {!hasMore && (
          <Box className="flex justify-center items-center py-4">
            <Typography variant="body1" color="textSecondary">
              You've reached the end of the line!
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            insetInlineEnd: 446,
            zIndex: 1000,
          }}
        >
          <Fab color="primary" aria-label="add post" onClick={handleOpenDailog}>
            <AddIcon />
          </Fab>
        </Box>
      </div>
      <CustomDialog maxWidth="sm" open={isOpen} onClose={handleClose}>
        <AddPost onClose={handleClose} onAdding={handleAddPost} />
      </CustomDialog>
    </>
  );
};

export default Posts;
