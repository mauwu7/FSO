import { useCounter } from "../store"
import { useState, useEffect } from "react"

const Statistics = () => {

const { good, bad, neutral} = useCounter()

const all = good+bad+neutral
const average = all/3
const positive = all === 0 ? 0: ((good/all)*100)
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
