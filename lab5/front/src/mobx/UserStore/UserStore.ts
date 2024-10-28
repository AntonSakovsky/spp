import { User } from "@type/models/user";
import { makeAutoObservable } from "mobx";

class UserStore {
    user?: User;
    accessToken: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User, accessToken: string) {
        this.user = user;
        this.accessToken = accessToken;
    }
}

export const userStore = new UserStore();
