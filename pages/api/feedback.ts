import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

type Feedback = {
  id: string;
  email: string;
  feedback: string;
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
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data: Feedback[] = JSON.parse(fileData.toString());
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    // send feedback response
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    res.status(200).json({ message: 'This works' });
  }
};

export default handler;
