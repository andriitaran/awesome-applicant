import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "get",
    route: "/awesome/applicant",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/awesome/applicant/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/awesome/applicant",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/awesome/applicant/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "put",
    route: "/awesome/applicant/:id",
    controller: UserController,
    action: "update",
  },
];
