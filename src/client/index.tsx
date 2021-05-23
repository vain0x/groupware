import React from "react"
import ReactDOM from "react-dom"
import { Main, MainProps, RenderPoint } from "./main"

{
  const dataFromElement = (e: HTMLElement): unknown =>
    JSON.parse(e.getAttribute("data-json") ?? "null")

  const appContainerElement = document.getElementById("app-container") as HTMLElement
  const mainProps = dataFromElement(document.getElementById("main-props-script") as HTMLScriptElement) as MainProps

  ReactDOM.hydrate((<Main {...mainProps} />), appContainerElement)
}
