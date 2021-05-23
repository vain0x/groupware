import React from "react"

export const Main = () => {

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

  return (
    <article>
      Hello, world!
    </article>
  )
}
