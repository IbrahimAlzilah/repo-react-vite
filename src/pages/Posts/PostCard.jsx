import Typography from "@mui/material/Typography";

const PostCard = ({ post, isLastPost, lastElementRef }) => {
  // const authorProfileImage = typeof post.author.profile_image === 'string' ? post.author.profile_image : post.author.profile_image?.url || '../images/avatars/default-profile.png';
  const authorProfileImage =
    typeof post?.author?.profile_image === 'string'
      ? post.author.profile_image
      : post?.author?.profile_image?.url || '../images/avatars/default-profile.png';
  // const authorProfileImage =
  //   typeof post?.author?.profile_image === 'string'
  //     ? post.author.profile_image
  //     : '../images/avatars/default-profile.png';
  return (
    <div
      key={post.id}
      className="bg-white rounded shadow p-3"
      ref={isLastPost ? lastElementRef : null}
    >
      <div className="flex items-center mb-2">
        <img
          // src={post.author.profile_image}
          src={authorProfileImage}
          alt="Author"
          className="w-10 h-10 rounded-full me-2 border"
        />
        <span className="font-semibold text-sm">{post.author.name}</span>
      </div>
      <div className="img-container">
        <img
          src={post.image}
          alt={post.body?.slice(0, 30) || "Post image"}
          className="rounded mb-2 w-full h-56 object-cover"
        />
      </div>
      <div className="text-xs text-gray-500 mb-1">{post.created_at}</div>
      <Typography variant="body2" className="mb-2">
        {post.body}
      </Typography>
      <Typography
        variant="caption"
        color="primary"
        sx={{ cursor: "pointer", fontWeight: 500 }}
      >
        Comments ({post.comments_count})
      </Typography>
    </div>
  );
};

export default PostCard;
