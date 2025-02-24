import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequest } from "../../utils/services";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../utils/Interfaces";
import { login, logout } from "../../redux/authSlice";
import image from "../../../../server/uploads/image_1740328206347.jpeg"

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state): IUser => state.auth);
  console.log(user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getRequest("check-auth");
        if (!res?.ok) {
          dispatch(logout())
          navigate("/login");
        } else {
          dispatch(login({ isLogged: true }));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, dispatch]);
 console.log(`../../../../server/${user.image}`)
  return (
     <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
  {user.image ? (
    <img
      src={`http://localhost:4000/${user.image}`}
      alt="Profile Picture"
      width={200}
      height={200}
      className="rounded-full mb-4 border-4 border-gray-300 dark:border-gray-600 shadow-md"
    />
  ) : (
    <Link to={"/profile"} className="text-blue-500 hover:text-blue-600 font-medium">
      Update your image
    </Link>
  )}

  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{user.name}</h1>
</div>

    </main>
  );
}
