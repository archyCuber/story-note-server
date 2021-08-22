import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { BASE_URL } from "../axiosConfig";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {}
  }

  async registration(username: string, password: string) {
    try {
      const response = await AuthService.registration(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {}
  }

  async logout() {
    const response = await AuthService.logout();
    this.setAuth(false);
    this.setUser({} as IUser);
    localStorage.removeItem("token");
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      console.log(response.data)
      this.setUser(response.data.user);
    } catch (e) {}
  }
}
