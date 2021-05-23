import React from "react"
import ReactDOM from "react-dom"
import { Main } from "./main"

export const main = () => {
  const appContainerElement = document.getElementById("app-container") as HTMLElement

  ReactDOM.hydrate((<Main />), appContainerElement)
}

main()
