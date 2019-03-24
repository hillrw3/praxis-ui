import React from "react"
import './Home.scss'

const API_URL = process.env.API_URL || "http://localhost:3000/api"

export class Home extends React.Component {
  constructor(props) {
    super(props)
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

  fetchHabits = () => {
    fetch(`${API_URL}/progress_report`)
      .then(response => response.json())
      .then(response => {
        this.setState({habits: response})
      })
  }

  completeHabit = (habit) => {
    fetch(`${API_URL}/habits/${habit.id}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
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

  deleteHabit = (habit) => {
    fetch(`${API_URL}/habits/${habit.id}`, {
      method: 'DELETE',
    })
      .then(this.fetchHabits)
  }

  onChange = (e) => {
    this.setState({newHabit: e.target.value})
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') this.addHabit()
  }

  render() {
    const {habits: {todo, completed}} = this.state

    return (
      <div className="home">
        <div className="habit-list">
          <h4 className='header'>Daily Habits</h4>
          <span className="new-habit habit">
            <div className="habit-title-and-actions">
              <input type="text"
                     placeholder="Start a new habit"
                     onChange={this.onChange}
                     onKeyPress={this.handleKeyPress}
                     value={this.state.newHabit}/>
              <button onClick={this.addHabit}>+</button>
            </div>
          </span>
          <ul className='list todo'>
            {todo.map(habit => (
              <div className="habit" key={habit.id}>
                <div className="habit-title-and-actions">
                  <span className="habit-title">{habit.title}</span>
                  <span className="habit-actions">
                  <button onClick={() => this.completeHabit(habit)}>✓</button>
                  <button onClick={() => this.deleteHabit(habit)}>X</button>
                </span>
                </div>
                <div className="current-streak">Current streak: {habit.current_streak}</div>
              </div>
            ))}
          </ul>
          <ul className='list completed'>
            {completed.map(habit => (
              <div className="habit completed" key={habit.id}>
                <div className="habit-title-and-actions">
                  <span className="habit-title">{habit.title}</span>
                  <span className="habit-actions">
                    <button onClick={() => this.deleteHabit(habit)}>X</button>
                  </span>
                </div>
                <div className="current-streak">Current streak: {habit.current_streak}</div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}