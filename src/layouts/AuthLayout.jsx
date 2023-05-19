import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="w-screen h-screen login flex justify-center items-center">
        <div className="container mx-auto ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
