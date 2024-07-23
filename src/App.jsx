import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./router/layout/Navbar/Navbar";
import Home from "./router/pages/Home/Home";
import Join from "./router/pages/Join/Join";
import Login from "./router/pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./router/pages/ProtectedPage/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import Edituser from "./router/pages/EditUser/Edituser";
import NotFound from "./scss/router/pages/404Page/About";
import UploadProductPage from "./router/pages/UploadProductPage/UploadProductPage";
import HistoryPage from "./router/pages/HistoryPage/HistoryPage";
import CartPage from "./router/pages/CartPage/CartPage";
import DetailProductPage from "./router/pages/DetailProductPage/DetailProductPage";

function Layout() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={3000}
      />

      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* 로그인한 사람만 감 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/product/upload" element={<UploadProductPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/edituser" element={<Edituser />} />
        </Route>

        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
