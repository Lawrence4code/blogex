import React, { useState, useEffect, useRef } from 'react';

import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentElement = useRef();
    const nameElement = useRef();
    const emailElement = useRef();
    const storeDataElement = useRef();

    useEffect(() => {
        nameElement.current.value = window.localStorage.getItem('name')
        emailElement.current.value = window.localStorage.getItem('email')
    }, []);


    const handleCommentSubmission = () => {
        setError(false);
        const { value: comment } = commentElement.current;
        const { value: name } = nameElement.current;
        const { value: email } = emailElement.current;
        const { value: storeData } = storeDataElement.current;
        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        if (storeData) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        } else {
            window.localStorage.removeItem('name', name)
            window.localStorage.removeItem('email', email)
        }

        const commentObj = {
            name, email, comment, slug
        }

        submitComment(commentObj)
            .then(response => {
                setShowSuccessMessage(true)
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000);
            })
    }

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Please leave a reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentElement}
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' placeholder='Comment' name='comment' />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type='text' ref={nameElement}
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' placeholder='Name' name='name' />
                <input type='text' ref={emailElement}
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' placeholder='Email' name='email' />
            </div>
            {
                error && <p className='text-xs text-red-500'> All fields are required!</p>
            }
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataElement} type='checkbox' id='storeData' name='storeData' value='true' />
                    <label className='text-gray-500 cursor-pointer ml-2' htmlFor="storeData">Save email and name for future.</label>
                </div>
            </div>
            <div className="mt-8">
                <button type='button' onClick={handleCommentSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
                {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review.</span>}
            </div>
        </div>
    );
};

export default CommentsForm;
