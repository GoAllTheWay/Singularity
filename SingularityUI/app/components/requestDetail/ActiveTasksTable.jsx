import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Utils from '../../utils';

import UITable from '../common/table/UITable';
import {
  TaskId,
  LastTaskState,
  DeployId,
  StartedAt,
  UpdatedAt,
  LogLinkAndJSON
} from '../tasks/Columns';

import TaskStateBreakdown from './TaskStateBreakdown';

const ActiveTasksTable = ({requestId, tasksAPI}) => {
  const tasks = tasksAPI ? tasksAPI.data : [];
  const emptyTableMessage = (Utils.api.isFirstLoad(tasksAPI)
    ? <p>Loading...</p>
    : <p>No active tasks</p>
  );

  return (
    <div>
      <h2>Running instances</h2>
      { localStorage.enableTaskStateBreakdown ? <TaskStateBreakdown requestId={requestId} /> : null }
      <UITable
        data={tasks}
        keyGetter={(t) => t.taskId.id}
        emptyTableMessage={emptyTableMessage}
      >
        {TaskId}
        {LastTaskState}
        {DeployId}
        {StartedAt}
        {UpdatedAt}
        {LogLinkAndJSON}
      </UITable>
    </div>
  );
};

ActiveTasksTable.propTypes = {
  requestId: PropTypes.string.isRequired,
  tasksAPI: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  tasksAPI: Utils.maybe(
    state.api.activeTasksForRequest,
    [ownProps.requestId]
  )
});

export default connect(
  mapStateToProps,
  null
)(ActiveTasksTable);