import axios from 'axios';

// ----------- Hack to create a delay ---------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delay() {
  await sleep(2000);
}

//----------------------------------------------------------

export const createAVoteBegin = () => ({
  type: 'CREATE_A_VOTE_BEGIN',
});

export const createAVoteSuccess = result => ({
  type: 'CREATE_A_VOTE_SUCCESS',
  result,
});

export const createAVoteFailure = error => ({
  type: 'CREATE_A_VOTE_FAILURE',
  error,
});

export function createAVote(pseudo, email, title, date, time, endDate, endTime) {
  return (dispatch) => {
    dispatch(createAVoteBegin());
    return (
      axios({
        url: '/api/vote/add',
        method: 'post',
        data: {
          pseudo,
          email,
          title,
          date: `${date} ${time}`,
          end_date: `${endDate} ${endTime}`,
        }
      })
        .then(async (result) => {
          await delay();
          await dispatch(createAVoteSuccess(result.data));
        })
        .catch(error => dispatch(createAVoteFailure(error)))
    );
  };
}
