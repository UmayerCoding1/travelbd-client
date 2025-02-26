import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className='flex items-center justify-center h-screen '>
      <Link to={'/'} className='bg-red-500 p-3 rounded-lg text-white'>Back to home</Link>
    </div>
  );
};

export default Error;