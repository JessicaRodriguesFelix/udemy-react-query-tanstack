import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post }) {
 
  const { data, isLoading, error } = useQuery({ queryKey: ['comments', post.id], queryFn: () => fetchComments(post.id) });

  if (isLoading) {
    return <h3>{"Loading comments"}</h3>;
  }

  if(error) {
    return <h3>Something went wrong fetching comments..Error traceID: {error.toString()}</h3>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
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
