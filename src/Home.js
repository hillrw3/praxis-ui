import React from "react"
import './Home.scss'

const API_URL = process.env.API_URL || "http://localhost:3000"

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.completeHabit = this.completeHabit.bind(this)
    this.fetchHabits = this.fetchHabits.bind(this)

    this.state = {
      habits: {
        todo: [],
        completed: []
      }
    }
  }

  componentDidMount() {
    this.fetchHabits()
  }

  fetchHabits() {
    fetch(`${API_URL}/progress_report`)
      .then(response => response.json())
      .then(response => {
        this.setState({habits: response})
      })
  }

  completeHabit = (habit) => {
    fetch(`${API_URL}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({record: {habit_id: habit.id}})
    })
      .then(this.fetchHabits)
  }

  render() {
    const {habits: {todo, completed}} = this.state

    return (
      <div className="home">
        <div className="habit-list">
          <h4 className='header'>To Do</h4>
          <ul className='list'>
            {todo.map(habit => <div className="habit" key={habit.id}>
              <span className="habit-title">{habit.title}</span>
              <span className="habit-action">
                <button onClick={() => this.completeHabit(habit)}>✓</button>
              </span>
            </div>)}
          </ul>

          <h4 className='header'>Completed</h4>
          <ul className='list'>
            {completed.map(habit => <div key={habit.id}>
              {habit.title}
            </div>)}
          </ul>
        </div>
      </div>
    )
  }
}