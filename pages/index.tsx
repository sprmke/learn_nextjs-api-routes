import { FormEvent, useRef } from 'react';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null!);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null!);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
  };

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
    </div>
  );
};

export default HomePage;
