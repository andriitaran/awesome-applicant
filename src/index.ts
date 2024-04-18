import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { port } from "./config";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            res.json(result);
          } catch (e) {
            next(e);
          }
        }
      );
    });

    // start express server
    app.listen(3000);

    // insert new users for test - use this to seed the database on initial run
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Andrii",
    //     lastName: "Taran",
    //     description: "An awesome applicant",
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "John",
    //     lastName: "Doe",
    //     description: "Not so awesome applicant",
    //   })
    // );

    console.log(`Express server has started on port ${port}`);
  })
  .catch((error) => console.log(error));
