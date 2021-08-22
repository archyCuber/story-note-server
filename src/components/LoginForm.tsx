import React, { useContext, useState } from "react";
import { Context } from "../index";
import {observer} from "mobx-react-lite";

interface IUserState {
  name: string;
  password: string;
}

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState<IUserState>({} as IUserState);
  const { store } = useContext(Context);
  return (
    <div>
      <input
        placeholder={"User Name"}
        value={userInfo.name}
        onChange={(e) => {
          setUserInfo({ ...userInfo, name: e.target.value });
        }}
      />
      <input
        placeholder={"Password"}
        type={"password"}
        value={userInfo.password}
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
      />
      <button
        onClick={() => {
          store.login(userInfo.name, userInfo.password);
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          store.registration(userInfo.name, userInfo.password);
        }}
      >
        Registration
      </button>
    </div>
  );
};

export default observer(LoginForm)
