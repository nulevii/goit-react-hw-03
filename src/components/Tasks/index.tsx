import React from 'react'

import PhoneBook from '../PhoneBook'
import StatisticsTask from '../StaticsticsTask'

function Task ({ taskNumber }: { taskNumber: number }): JSX.Element | null {
  if (taskNumber === 1) {
    return <StatisticsTask />
  }
  if (taskNumber === 2) {
    return <PhoneBook/>
  }

  return null
}

export default Task
