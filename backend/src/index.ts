import * as Koa from "koa";
import * as KoaStatic from "koa-static";
import * as KoaSession from "koa-session";
import * as KoaRouter from "koa-router";
import * as KoaBody from "koa-body";
import * as KoaCors from "@koa/cors";
import * as path from "path";
import { RegisterRoutes } from "./routes/routes";
import Logger from "./logger";

import "./controllers";

const app = new Koa();

app.keys = ["secret key here"];

app.use(KoaSession(app));
app.use(KoaCors());
app.use(KoaBody({
	multipart: true,
	jsonLimit: "10mb",
	formLimit: "10mb",
	textLimit: "10mb",
}));

app.use(KoaStatic(path.join(__dirname, "public")));
const router = new KoaRouter();
RegisterRoutes(router);
app.use(router.routes()).use(router.allowedMethods());



app.listen(3333);

Logger.info("App is listening at port 3333!");
