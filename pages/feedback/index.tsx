import { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Feedback } from '../../types/feedback';
import { getFeedbackData } from '../api/feedback/index';

const FeedbackPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ feedbackItems }) => {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const getFeedbackHandler = async (id: string) => {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();
    const { feedback }: { feedback: Feedback } = data;

    setSelectedFeedback(feedback);
  };

  return (
    <div>
      {selectedFeedback && (
        <div>
          <h2>Selected Feedback</h2>
          <p>{selectedFeedback.id}</p>
          <p>{selectedFeedback.email}</p>
          <p>{selectedFeedback.feedback}</p>
        </div>
      )}
      <hr />
      <div>
        <h2>Feedback items</h2>
        {feedbackItems.length > 0 && (
          <ul>
            {feedbackItems?.map(({ id, email, feedback }) => (
              <li key={id}>
                {feedback}
                <button onClick={getFeedbackHandler.bind(null, id)}>
                  Get Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;

export const getStaticProps: GetStaticProps<{
  feedbackItems: Feedback[];
}> = async () => {
  // get feedback data from file
  const data = getFeedbackData();

  return {
    props: {
      feedbackItems: data,
    },
  };
};
