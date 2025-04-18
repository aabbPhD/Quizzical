export default function FetchError({errorMsg, setGameMode}) {
    function tryAgain() {
        setGameMode('INTRO');
    }

    return(
        <div className='fetch-error'>
            <h1>{errorMsg}</h1>
            <button onClick={tryAgain}>Try again</button>
        </div>  
    )
}