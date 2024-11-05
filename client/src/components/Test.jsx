import { useAuth } from "../Login/AuthContext";
export default function Text() {
  const { auth } = useAuth();
  console.log(auth.isLoggedIn);

  return (
    <>
      <div>okeoke</div>
    </>
  );
}
