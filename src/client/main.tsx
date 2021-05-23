import React, { ReactNode } from "react"
import { never } from "../util/never"

interface RouteObject {
  href: string
  open(): Promise<RouteResult>
}

type RouteResult =
  {
    kind: "redirect"
    location: RouteObject
  } | {
    kind: "render"
    render(): ReactNode
  }

export type RenderPoint =
  {
    pathname: string
    query?: unknown
  } & ({
    pathname: "/"
  } | {
    pathname: "/login/"
  })

const Root = () => (<div>Hello, world!</div>)

const LoginPage = () => {
  return (
    <article id="login-page">
      <h1>Groupware</h1>

      <form method="post">
        <label>
          Login Id:
          <input type="text" autoComplete="username" name="loginId"
            required maxLength={300} />
        </label>

        <label>
          Password:
          <input type="password" autoComplete="password" name="password"
            required maxLength={300} />
        </label>

        <div>
          <button>Login</button>
        </div>
      </form>
    </article>
  )
}

const fromRenderPoint = (endpoint: RenderPoint): ReactNode => {
  switch (endpoint.pathname) {
    case "/":
      return (<Root />)

    case "/login/":
      return (<LoginPage />)

    default:
      throw never(endpoint)
  }
}

export interface MainProps {
  renderPoint: RenderPoint
}

export const Main = (props: MainProps) => {
  const { renderPoint: initialRenderPoint } = props

  React.useEffect(() => {
    console.log("connecting")
    const ws = new WebSocket(`ws://${location.host}`)

    ws.onmessage = function (ev) {
      console.log("received", ev)
    }

    ws.onopen = () => {
      ws.send("connected!")
    }

    return () => {
      ws.close()
    }
  }, [])

  return (<>{fromRenderPoint(initialRenderPoint)}</>)
}
