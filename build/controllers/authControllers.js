"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.logout = exports.getProtectedPage = exports.getMainPage = exports.login = exports.getLoginForm = void 0;
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted");
}
exports.requireAuth = requireAuth;
const getLoginForm = (req, res) => {
    res.send(`
  <form method="POST">
    <div>
      <label>Email</label>
      <input name="email"/>
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password"/>
    </div>
    <button type="submit">Submit</button>
  </form>
  `);
};
exports.getLoginForm = getLoginForm;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email && password) {
        // from cookie-session in index.ts
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        throw new Error("Email and/or Password is undefined");
    }
});
exports.login = login;
const getMainPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session && req.session.loggedIn) {
        res.send(`
      <div>
        <h3>You are logged in!</h3>
        <a href="/logout">Logout</a>
      </div>
    `);
    }
    else {
        res.send(`
      <div>
        <h3>You are NOT logged in</h3>
        <a href="/login">Login</a>
      </div>
    `);
    }
});
exports.getMainPage = getMainPage;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = undefined;
    res.redirect("/");
});
exports.logout = logout;
const getProtectedPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to protected route, logged in user!");
});
exports.getProtectedPage = getProtectedPage;
