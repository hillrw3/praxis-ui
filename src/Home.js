import React from "react"
import './Home.scss'

const API_URL = process.env.API_URL || "http://localhost:3000"

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.completeHabit = this.completeHabit.bind(this)
    this.fetchHabits = this.fetchHabits.bind(this)

    this.state = {
      newHabit: '',
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

  addHabit = () => {
    fetch(`${API_URL}/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({habit: {title: this.state.newHabit}})
    })
      .then(() => {
        this.setState({newHabit: ''})
        this.fetchHabits()
      })
  }

  onChange = (e) => {
    this.setState({newHabit: e.target.value})
  }

  render() {
    const {habits: {todo, completed}} = this.state

    return (
      <div className="home">
        <div className="habit-list">
          <h4 className='header'>Daily Habits</h4>
          <span className="new-habit habit">
            <input type="text" placeholder="Start a new habit" onChange={this.onChange} value={this.state.newHabit}/>
            <button onClick={this.addHabit}>+</button>
          </span>
          <ul className='list todo'>
            {todo.map(habit => (
              <div className="habit" key={habit.id}>
                <span className="habit-title">{habit.title}</span>
                <span className="habit-action">
                  <button onClick={() => this.completeHabit(habit)}>✓</button>
                </span>
              </div>
            ))}
          </ul>
          <ul className='list completed'>
            {completed.map(habit => (
              <div className="habit completed" key={habit.id}>
                <span className="habit-title">{habit.title}</span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}