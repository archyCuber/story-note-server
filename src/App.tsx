import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Context } from "./index";
import {observer} from "mobx-react-lite";
import LoginForm from "./components/LoginForm";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.userName}` : 'Аторизуйтесь'}</h1>
      <LoginForm />
    </div>
  );
}

export default observer(App);
