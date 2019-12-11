export const markNotificationToRead = id => {
  return dispatch => {
    dispatch(startMarkToRead(id));
    setTimeout(() => {
      dispatch({
        type: 'MARK_NOTIFICATION_TO_READ',
        payload: {
          id
        }
      });
      dispatch(finishMarkToRead(id));
    }, 1000);
  };
};

export const markAllNotificationToUnread = () => {
  return dispatch => {
    dispatch(startMarkToRead());
    setTimeout(() => {
      dispatch({
        type: 'MARK_ALLNOTIFICATION_TO_UNREAD'
      });
      dispatch(finishMarkToRead());
    }, 1000);
  };
};

export const markAllNotificationToRead = () => {
  return dispatch => {
    dispatch(startMarkToRead());
    setTimeout(() => {
      dispatch({
        type: 'MARK_ALLNOTIFICATION_TO_READ'
      });
      dispatch(finishMarkToRead());
    }, 1000);
  };
};

const startMarkToRead = id => {
  return id ? { type: 'START_MARK_TO_READ', payload: { id } } : { type: 'START_MARK_TO_READ' };
};
const finishMarkToRead = id => {
  return id ? { type: 'FINISH_MARK_TO_READ', payload: { id } } : { type: 'FINISH_MARK_TO_READ' };
};
