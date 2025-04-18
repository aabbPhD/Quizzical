import "./App.scss"
import React from "react"
import GameIntro from "./components/GameIntro"
import Quiz from "./components/Quiz"
import MyLoader from "./components/MyLoader"
import FetchError from "./components/FetchError"

export default function App() {
  //Возможные состояния gameMode: INTRO, QUIZ_STARTED, QUIZ_FINISHED
  let [gameMode, setGameMode] = React.useState("INTRO");
  let [gameOptions, setGameOptions] = React.useState({category: "", difficulty: "", type: ""});
  let [loading, setLoading] = React.useState(false);
  let [currentData, setCurrentData] = React.useState([]);
  let [fetchError, setFetchError] = React.useState(null);

  //перед началом новой игры сбрасываем все состояния
  React.useEffect(() => {
    if (gameMode === 'INTRO') {
      setGameOptions({category: "", difficulty: "", type: ""});
      setCurrentData([]);
      setFetchError(null);
    }
  }, [gameMode])

  function startQuiz() {
    setGameMode("QUIZ_STARTED");
    fetchData();
  }

  async function fetchData() {
    setLoading(true);
    try {
      let {category, difficulty, type} = gameOptions;
      let categoryQuery = (category === "") ? "" : `&category=${category}`;
      let difficultyQuery = (difficulty === "") ? "" : `&difficulty=${difficulty}`;
      let typeQuery = (type === "") ? "" : `&type=${type}`;
      let apiUrl = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`;

      let response = await fetch(apiUrl);
      if (!response.ok) {
        //частая ошибка: слишком большое кол-во запросов в единицу времени
        if (response.status === 429) {
            throw new Error("Too many requests. Try again later or refresh the page.");
          } else {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
      }
      let json = await response.json();
      let data = json.results;
      setCurrentData(data);
      //частая ошибка: не удалось получить данные для заданных параметров
      //Например: Category: "Mythology", Difficulty: "Hard", Type: "True/False"
      if (!data.length) throw new Error("Failed to fetch data. Try to choose another options.");
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    (gameMode === "INTRO") 
      ? <GameIntro 
          startQuiz={startQuiz}
          setGameOptions={setGameOptions}
        /> 
      : (loading 
          ? <MyLoader />
          : (!fetchError
              ? <Quiz 
                  gameMode={gameMode} 
                  setGameMode={setGameMode}
                  currentData={currentData}
                />
              : <FetchError 
                  errorMsg={fetchError}
                  setGameMode={setGameMode}
                />
            )
        )
  )
}
