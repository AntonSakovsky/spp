import { todoStore } from "./TodosStore/TodosStore";
import { userStore } from "./UserStore/UserStore";

export class Store {
    userStore = userStore;
    todoStore = todoStore;
}
