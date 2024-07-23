import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { edittUser } from "../../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";

function Edituser() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const isEdit = useSelector((state) => state.user.isEdit);
  console.log(isEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "onChange" });

  const onSubmit = async ({ email, name, password1, password2 }) => {
    const body = {
      id: user.id,
      email,
      name,
      password: password1,
      password2,
    };

    try {
      await dispatch(edittUser(body, user.id)).unwrap();
      reset();
      Navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const userEmail = {};
  const userName = {};
  const userPassword1 = {
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };
  const userPassword2 = {
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };

  // useEffect(() => {
  //   // 초기값 설정
  //   setValue("email", user.email);
  //   setValue("name", user.name);
  // }, [user, setValue]);

  return (
    <section>
      <div className="join-page">
        <div className="header">
          <h1>회원 정보 수정</h1>
        </div>
        <form className="join" onSubmit={handleSubmit(onSubmit)}>
          <div className="join-box">
            <input
              type="email"
              placeholder={user.email}
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
              placeholder={user.name}
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
          <button type="submit">정보수정</button>
        </form>
      </div>
    </section>
  );
}

export default Edituser;
