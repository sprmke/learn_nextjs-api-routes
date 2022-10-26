import { FormEvent, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { Feedback } from '../types/feedback';

const HomePage: NextPage = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[] | []>([]);
  const emailInputRef = useRef<HTMLInputElement>(null!);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null!);

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      feedback: enteredFeedback,
    };

    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setFeedbackItems(data.feedback);
  };

  const getFeedbackHandler = async () => {
    const response = await fetch('/api/feedback');

    const data = await response.json();
    setFeedbackItems(data.feedback);
  };

  useEffect(() => {
    getFeedbackHandler();
  }, []);

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Feedback</label>
          <textarea id='feedback' rows={5} ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={getFeedbackHandler}>Load Feedbacks</button>
      {feedbackItems.length > 0 && (
        <ul>
          {feedbackItems?.map(({ id, email, feedback }) => (
            <li key={id}>
              <p>{email}</p>
              <p>{feedback}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
