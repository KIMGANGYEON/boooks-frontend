import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const moveLR = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const [right, setRight] = useState(true);

  const onClick = () => {
    moveLR.current.classList.toggle("moveLR");
    setRight((perv) => !perv);
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/");
    });
  };

  return (
    <section className="navbar">
      <div ref={moveLR} className="header">
        <h1>
          <a href="/edituser">내정보 수정</a>
        </h1>
        <h1>
          <a href="/product/upload">상품 업로드</a>
        </h1>

        <h1>
          <a href="/user/cart">장바구니(1)</a>
        </h1>
        <h1>
          <a href="/history">결제내역</a>
        </h1>
      </div>
      <div className="navbar-box">
        <div>
          <a href="/">
            <h1>Book</h1>
          </a>
        </div>
        <div>
          <h2>
            {isAuth ? (
              <a onClick={onClick}>{right ? "MORE ←" : "MORE →"}</a>
            ) : (
              <a href="/join">회원가입</a>
            )}
          </h2>
          <h2>
            {isAuth ? (
              <a onClick={handleLogout}>로그아웃</a>
            ) : (
              <a href="/login">로그인</a>
            )}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
