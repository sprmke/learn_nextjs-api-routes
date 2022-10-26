import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Feedback } from '../../types/feedback';
import { getFeedbackData } from '../api/feedback';

const FeedbackPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ feedbackItems }) => {
  return (
    <div>
      <h2>Feedback items</h2>
      {feedbackItems.length > 0 && (
        <ul>
          {feedbackItems?.map(({ id, email, feedback }) => (
            <li key={id}>{feedback}</li>
          ))}
        </ul>
      )}
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
