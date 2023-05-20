import { Request, Response, NextFunction } from "express";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction):void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}

const getLoginForm = (req: Request, res: Response) => {
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

const login = async (req: BodyRequest, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    // from cookie-session in index.ts
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    throw new Error("Email and/or Password is undefined");
  }
};

const getMainPage = async (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <h3>You are logged in!</h3>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h3>You are NOT logged in</h3>
        <a href="/login">Login</a>
      </div>
    `);
  }
};

const logout = async (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
};

const getProtectedPage = async (req: Request, res: Response) => {
  res.send("Welcome to protected route, logged in user!")
};

export {
  getLoginForm,
  login,
  getMainPage,
  getProtectedPage,
  logout,
  requireAuth,
};
