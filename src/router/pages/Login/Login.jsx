import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { joinUser, loginUser } from "../../../store/thunkFunctions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));
    reset();
  };

  const userEmail = {
    required: "필수 필드입니다",
  };

  const userPassword = {
    required: "필수 필드입니다",
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };

  return (
    <section>
      <div className="join-page">
        <div className="header">
          <h1>로그인</h1>
        </div>
        <form className="join" onSubmit={handleSubmit(onSubmit)}>
          <div className="join-box">
            <input
              type="email"
              placeholder="이메일을 입력해 주세요."
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div>
                <span style={{ color: "red", fontSize: 14 }}>
                  {errors.email.message}
                </span>
              </div>
            )}

            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span style={{ color: "red", fontSize: 14 }}>
                  {errors.password.message}
                </span>
              </div>
            )}
          </div>
          <button type="submit">로그인</button>
        </form>
        <p>
          아이디가 없다면? <a href="/join">회원가입</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
