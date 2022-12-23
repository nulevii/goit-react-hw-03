import React, { Component } from 'react'
import style from './style.module.css'

import Statistics from './Statistics'
import FeedbackOptions from './FeedbackOptions'
import Notification from './Notification'
interface StatisticsInterface {
  good: number
  netural: number
  bad: number
}
export class StatisticsTask extends Component {
  state: StatisticsInterface = {
    good: 0,
    netural: 0,
    bad: 0
  }

  options = Object.keys(this.state)

  onLeaveFeedback = (option: string): void => {
    this.setState((prevState: StatisticsInterface) => {
      return {
        [option]: prevState[option as keyof StatisticsInterface] + 1
      }
    })
  }

  countTotalFeedback = (numbers: StatisticsInterface): number => {
    return Object.values(numbers).reduce(
      (acc: number, element: number) => acc + element,
      0
    )
  }

  countPositiveFeedbackPercentage = (numbers: StatisticsInterface): number => {
    const positiveFeedback = Math.round(
      (numbers.good / (numbers.netural + numbers.bad + numbers.good)) * 100
    )
    if (isNaN(positiveFeedback)) {
      return 0
    }
    return positiveFeedback
  }

  render (): JSX.Element {
    return (
      <section className={style.statistics}>
        <h2 className={style.title}>Please leave feedback</h2>
        <FeedbackOptions
          options={this.options}
          onLeaveFeedback={this.onLeaveFeedback}
        ></FeedbackOptions>

        <h3>Statistics</h3>
        {this.countTotalFeedback(this.state) !== 0
          ? (
          <Statistics
            good={this.state.good}
            neutral={this.state.netural}
            bad={this.state.bad}
            total={this.countTotalFeedback(this.state)}
            positivePercentage={this.countPositiveFeedbackPercentage(
              this.state
            )}
          ></Statistics>
            )
          : <Notification message="There is no feedback"/>
        }
      </section>
    )
  }
}

export default StatisticsTask
