import { decode } from "html-entities"
import correct_img from '../assets/img/correct.png'
import incorrect_img from '../assets/img/incorrect.png'

export default function QuizItem({questionData, questionNumber, selectedAnswers, setSelectedAnswers, gameMode}) {
    function renderAnswers(correct_answer, incorrect_answers, questionNumber) {
        return [correct_answer, ...incorrect_answers]
        .sort()
        .map(item => {
            let answerOptionStyle = (item === selectedAnswers[questionNumber]) ? "answer selected" : "answer";
            if (gameMode === 'QUIZ_FINISHED') {
                if (item === correct_answer) answerOptionStyle = "answer correct";
                if (item === selectedAnswers[questionNumber] && item !== correct_answer) answerOptionStyle = "answer incorrect";
            }
            return  <div 
                        key={item} 
                        className={answerOptionStyle}
                        onClick={() => selectAnswer(item, questionNumber)}>
                            {decode(item)}
                    </div>
        })
    }

    function selectAnswer(selectedAnswer, questionNumber) {
        if (gameMode !== 'QUIZ_STARTED') return;
        setSelectedAnswers(prevState => prevState.map((item, index) => {
            return index === questionNumber ? selectedAnswer : item
        }))
    }

    let imgSrc = "";
    if (gameMode === 'QUIZ_FINISHED') imgSrc = (selectedAnswers[questionNumber] === questionData.correct_answer) ? correct_img : incorrect_img;

    return (
        <div className="quiz-item" key={questionData.question}>
            {(gameMode === 'QUIZ_FINISHED') && <img src={imgSrc} alt=''/>}
            <p className="question">{decode(questionData.question)}</p>
            <div className="answer-options">
                {renderAnswers(questionData.correct_answer, questionData.incorrect_answers, questionNumber)}
            </div>
        </div>
    )
}