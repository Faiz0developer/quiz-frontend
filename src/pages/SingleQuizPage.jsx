import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const SingleQuizPage = () => {
    const myQuizzes = useSelector((state) => state.myQuiz.quizData);
    const param = useParams()
    const data = myQuizzes.find(myQuiz => myQuiz._id===param.quizId)
    console.log(data)
  return (
    <div>{param.quizId}</div>
  )
}

export default SingleQuizPage