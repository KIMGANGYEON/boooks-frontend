import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../store/thunkFunctions";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const userCartDetail = useSelector((state) => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItemIds = [];
    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });
      const body = {
        cartItemIds,
        userCart: userData.cart,
      };
      dispatch(getCartItems(body));
      console.log("hello");
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calculateTotal(userCartDetail);
  }, [userCartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => (total += item.price * item.quantity));
    setTotal(total);
  };

  return (
    <section>
      <div>
        <h2>장바구니</h2>
      </div>
      {userCartDetail?.length > 0 ? (
        <>
          <div>
            <p>
              <span>합계ㅣ {total}</span>
            </p>
            <button>결제하기</button>
          </div>
        </>
      ) : (
        <p>장바구니가 비었음</p>
      )}
    </section>
  );
};

export default CartPage;
