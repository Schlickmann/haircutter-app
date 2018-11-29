const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const nunjucks = require("nunjucks");
const path = require("path");
const flash = require("connect-flash");
const dateFilter = require("nunjucks-date-filter-local");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    // to work with forms
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    this.express.use(
      session({
        name: "root",
        secret: "MyAppSecret",
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, "..", "temp", "sessions")
        }),
        saveUninitialized: true
      })
    );
  }

  views() {
    // paths on Windows use back slash to form its path
    // it is different from others OS. For that reason we use
    // the path.resolve(). The param __dirname give us the current
    // folder, so, we must specify the path til reach the views.
    const env = nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });
    env.addFilter("date", dateFilter);

    this.express.use(express.static(path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }

  routes() {
    // make the server use the routes defined in routes.js
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
