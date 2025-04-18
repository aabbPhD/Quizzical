import { CATEGORIES, DIFFICULTIES, QUESTION_TYPES } from "../data/selectData"
import QuizSelect from "./QuizSelect"
import quiz_img from "../assets/img/quizzical.png"

export default function GameIntro({startQuiz, setGameOptions}) {
    return(
        <div className="game-intro">
            <img src={quiz_img} alt="quizzical"/>
            <h1>Quizzical</h1>
            <p>Answer the questions and test your knowledge!</p>
            <QuizSelect 
                selectData={CATEGORIES}
                selectId={"category"}
                labelText={"Category:"}
                setGameOptions={setGameOptions}
            />
            <QuizSelect 
                selectData={DIFFICULTIES}
                selectId={"difficulty"}
                labelText={"Difficulty:"}
                setGameOptions={setGameOptions}
            />
            <QuizSelect 
                selectData={QUESTION_TYPES}
                selectId={"type"}
                labelText={"Type of questions:"}
                setGameOptions={setGameOptions}
            />
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    )
}