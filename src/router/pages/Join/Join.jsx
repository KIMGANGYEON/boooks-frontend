import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { joinUser } from "../../../store/thunkFunctions";

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = ({ email, name, password1, password2 }) => {
    const body = {
      email,
      name,
      password: password1,
      password2,
    };

    dispatch(joinUser(body));
    reset();
  };

  const userEmail = {
    required: "필수 필드입니다",
  };
  const userName = {
    required: "필수 필드입니다",
  };
  const userPassword1 = {
    required: "필수 필드입니다",
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };
  const userPassword2 = {
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
          <h1>회원가입</h1>
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
              type="text"
              placeholder="이름을 입력해 주세요."
              {...register("name", userName)}
            />
            {errors?.name && (
              <div>
                <span style={{ color: "red", fontSize: 14 }}>
                  {errors.name.message}
                </span>
              </div>
            )}
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register("password1", userPassword1)}
            />
            {errors?.password1 && (
              <div>
                <span style={{ color: "red", fontSize: 14 }}>
                  {errors.password1.message}
                </span>
              </div>
            )}
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요."
              {...register("password2", userPassword2)}
            />
            {errors?.password2 && (
              <div>
                <span style={{ color: "red", fontSize: 14 }}>
                  {errors.password2.message}
                </span>
              </div>
            )}
          </div>
          <button type="submit">회원가입</button>
        </form>
        <p>
          아이디가 있다면? <a href="/login">로그인</a>
        </p>
      </div>
    </section>
  );
};

export default Join;
