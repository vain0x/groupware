import React from "react"

interface CalendarProps {
  // date -> schedule[]
  schedules: [string, string[]]
}

export interface QuerySender {
  fetchSchedules(): Promise<[string, string[]]>
}

export const SenderContext = React.createContext<QuerySender>(null!)
export const useSender = () => React.useContext(SenderContext)

export const CalendarPage = () => {
  // schedulesをpropsから受け取る
  // 元となったクエリを購読してschedulesの変化を受け取る

  const sender = useSender()

  const dates = []
  for (let i = 0; i < 31; i++) {
    dates.push(i + 1)
  }

  return (
    <article id="calendar-page">
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "3rem",
        listStyle: "none",
      }}>
        {dates.map(d => (
          <div key={d}>
            <div>{d}</div>
            <button type="button">追加</button>
          </div>
        ))}
      </div>
    </article>
  )
}
