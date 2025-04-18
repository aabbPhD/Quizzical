export default function QuizSelect({selectData, selectId, labelText, setGameOptions}) {
    
    function handleChange(e) {
        setGameOptions(prevState => {
            return {...prevState, [selectId]: e.target.value}
        })
    }

    let optionItems = selectData.map(item => {
        return <option key={item.value} value={item.value}>{item.text}</option>
    })

    return(
        <div className="select-container">
          <label htmlFor={selectId}>{labelText}</label>
          <select id={selectId} onChange={handleChange}>{optionItems}</select>
        </div>
    )
}