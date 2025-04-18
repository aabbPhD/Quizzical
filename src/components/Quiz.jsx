import React from "react";
import QuizItem from "./QuizItem";

export default function Quiz({gameMode, setGameMode, currentData}) {

    let [selectedAnswers, setSelectedAnswers] = React.useState([null, null, null, null, null]);
    let [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);

    function checkAnswers() {
        setGameMode('QUIZ_FINISHED');
        checkAmountOfCorrectAnswers();
    }

    function checkAmountOfCorrectAnswers() {
        currentData.map((item, index) => {
            if (selectedAnswers[index] === item.correct_answer) setCorrectAnswersCount(prevState => prevState + 1);
        })
    }

    function resetQuiz() {
        setGameMode('INTRO');
    }

    let quizItems = currentData.map((item, index) => {
        return  <QuizItem 
                    key={item.question}
                    questionData={item}
                    questionNumber={index}
                    selectedAnswers={selectedAnswers}
                    setSelectedAnswers={setSelectedAnswers}
                    gameMode={gameMode}
                />
    })

    let checkAnswersButtonStyle = selectedAnswers.some(item => item === null) ? "check-answers inactive" : "check-answers";

    return(
        (currentData.length !== 0) && <>
            <div className="quiz-container">
                {quizItems}
            </div>
            <div className="result">
                {gameMode !== "QUIZ_FINISHED"
                    ? <button className={checkAnswersButtonStyle} onClick={checkAnswers}>Check answers</button>
                    : <>
                        <p>You scored {correctAnswersCount} / 5 correct answers</p>
                        <button onClick={resetQuiz}>Play again</button>
                      </>}
            </div>
        </>
    )
}