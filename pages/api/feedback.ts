import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Feedback } from '../../types/feedback';

const getFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

export const getFeedbackData = () => {
  const filePath = getFeedbackPath();
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data: Feedback[] = JSON.parse(fileData.toString());

  return data;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // get and construct feedback data
    const { email, feedback }: Feedback = req.body;
    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    // store data in a file
    const data = getFeedbackData();
    data.push(newFeedback);
    fs.writeFileSync(getFeedbackPath(), JSON.stringify(data));

    // send feedback response
    res.status(201).json({ message: 'Success!', feedback: data });
  } else {
    // get data from a file
    const data = getFeedbackData();

    // send feedback response
    res.status(200).json({ message: 'Success!', feedback: data });
  }
};

export default handler;
