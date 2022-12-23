import React from 'react'

import PhoneBook from '../PhoneBook'

function Task ({ taskNumber }: { taskNumber: number }): JSX.Element | null {
  if (taskNumber === 1) {
    return <PhoneBook/>
  }
  if (taskNumber === 2) {
    return <div>Task Two</div>
  }

  return null
}

export default Task
