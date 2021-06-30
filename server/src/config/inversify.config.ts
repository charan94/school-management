/**
 * @file inversify.config.ts
 * @author K Sai Charan
*/

import "reflect-metadata";
import { Container } from 'inversify';
import { AuthController } from "../controllers/auth.controller";
import { TYPES } from "./inversify.types";

/**
 * Instantiates a container where the symbols from types.ts are mapped to the respective classes.
 * @export container which has all the mapped classes
 */

export const container = new Container();

container.bind<AuthController>(TYPES.AuthController).to(AuthController);