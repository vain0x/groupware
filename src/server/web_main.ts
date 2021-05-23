import compression from "compression"
import cookieSession from "cookie-session"
import express from "express"
import morgan from "morgan"
import path from "path"
import helmet from "helmet"

const DIST_DIR = path.resolve(__dirname, "../../dist")

export const newWebRouter = (): express.Router => {
  const router = express.Router()

  const notFoundHandler: express.RequestHandler = (_req, res) =>
    res.sendStatus(404)

  const staticFileHandler = express.static(DIST_DIR)
  router.get([
    "favicon.ico",
    "/static/*"
  ], staticFileHandler, notFoundHandler)

  router.all("*", (req, res) => {
    console.error("unimplemented")
    res.send(req.url)
  })

  return router
}

export const newWebServer = (host: { getRouter(): express.Router }) => {
  const port = 8080
  const origin = "http://localhost:8080"

  const app = express()

  // (開発用) リクエストの URL や処理時間などをログ出力する。
  app.use(morgan("dev"))

  app.use(compression())
  app.use(helmet({ contentSecurityPolicy: false }))

  app.use(express.json())

  app.use(cookieSession({
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    sameSite: "lax",
    secret: "m+Xo23OJtJBH5V2OV3hV8w==",
  }))

  app.use((...args) => host.getRouter()(...args))

  return {
    start: () => {
      const server = app.listen(port, () => {
        console.log(`info: HTTP server is ready. Visit ${origin} .`)
      })
      return () => server.close()
    }
  }
}
