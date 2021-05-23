import React from "react"
import ReactDOM from "react-dom"

const Main = () => (
  <article>
    Hello, world!
  </article>
)

export const main = () => {
  const appContainerElement = document.getElementById("app-container") as HTMLElement

  ReactDOM.hydrate((<Main />), appContainerElement)
}

main()
