import { NextApiRequest, NextApiResponse } from 'next';
import { getFeedbackData } from './index';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      // get dynamic route id
      const { feedbackId } = req.query;

      // get selected feedback data from a file
      const data = getFeedbackData();
      const selectedFeedback = data.find(({ id }) => id === feedbackId);

      res.status(200).json({ message: 'Success!', feedback: selectedFeedback });
      break;
    }
    // case 'POST': {
    //   break;
    // }
    // case 'PUT': {
    //   break;
    // }
    // case 'DELETE': {
    //   break;
    // }
    default: {
      res.status(400).json({ message: 'Invalid request method!' });
    }
  }
};

export default handler;
