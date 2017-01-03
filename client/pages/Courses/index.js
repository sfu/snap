import React, { PropTypes }  from 'react'
import Relay from 'react-relay'
import { Widget } from 'components/Widget'
import { MyCourses } from 'components/MyCourses'
import { MyAssignmentsExams } from 'components/MyAssignmentsExams'
import calcTermForDate from 'utils/calcTermForDate'

const _Courses = React.createClass({
  propTypes: {
    viewer: PropTypes.object
  },

  render() {
    const {viewer} = this.props
    return (
      <div>
        <Widget title="My Courses">
          <MyCourses
            courseSchedule={viewer}
            term={calcTermForDate()}
            gaCategory="MyCourses"
          />
        </Widget>
        <Widget title="My Assignments & Exams">
          <MyAssignmentsExams assignmentExamSchedule={viewer} />
        </Widget>
      </div>
    )
  }
})

export default Relay.createContainer(_Courses, {
  fragments: {
    viewer: () => Relay.QL`
      fragment viewer on ViewerType {
        ${MyCourses.getFragment('courseSchedule', {term: calcTermForDate()})}
        ${MyAssignmentsExams.getFragment('assignmentExamSchedule')}
      }
    `
  }
})
