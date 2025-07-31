import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updatePost }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <h3>{"Loading comments"}</h3>;
  }

  if (error) {
    return (
      <h3>
        Something went wrong fetching comments..Error traceID:{" "}
        {error.toString()}
      </h3>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{" "}
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was (not)deleted!!</p>
        )}
      </div>
      <div>
        <button onClick={() => updatePost.mutate(post.id)}>Update title</button>
        {updatePost.isPending && <p className="loading">LOADING!!</p>}
        {updatePost.isSuccess && (
          <p className="success">Post was (not)updated!!</p>
        )}
        {updatePost.isError && <p className="error">Oh no, error!!</p>}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
