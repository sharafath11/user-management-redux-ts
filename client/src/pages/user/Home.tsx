import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequest } from "../../utils/services";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../utils/Interfaces";
import { login } from "../../redux/authSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state): IUser => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getRequest("check-auth");
        if (!res?.ok) {
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

  return (
     <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <img
          src="" 
          alt="Profile Picture"
          width={200}
          height={200}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold">{user.name}</h1>
      </div>
    </main>
  );
}
