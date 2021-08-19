import React,{useState} from 'react'
import axios from 'axios'


//unresolved application because of unable to use then methods properly

function Display({ displayList,setDisplayList }){

    const listSize = displayList.length;

    const nameList = displayList.map( (element) => <li>  {element.name} <button onClick={ function () { let arr =[]; arr.push(element); setDisplayList(arr)  }}> show </button>  </li>  )

    //const [weatherData,setWeatherData] = useState({})

    // conditional rendering based on the list length

    //first condition
    if( listSize > 10){
        return (
            <div>
                Too many matches,specify another filter
            </div>
        )
    }



    //second condition

    if( listSize <= 10 && listSize !== 1){
        return (
            <ul>
                {nameList}
            </ul>
        )
    }

    //third condition

    const flagURL = displayList[0].flag
    const languageList = displayList[0].languages.map( (element) => <li>  {element.name} </li>  )


    /*//using weatherstack api for fetching current weather
    const api_keys = process.env["REACT_APP_API_KEY"]
    const params = {
        access_key: api_keys,
        query: displayList[0].capital
    }
    //console.log(api_keys)
    const weatherDataPromise = axios.get( 'http://api.weatherstack.com/current',{params})


    weatherDataPromise.then(response => { setWeatherData(response.data) })


    console.log(weatherData)*/




    return (
        <div>
            <h1> {displayList[0].name} </h1> <br/>
            capital {displayList[0].capital} <br/>
            population {displayList[0].population} <br/>
            <h2>Spoken Languages </h2>
            <ul>
                {languageList}
            </ul>
            <div>  <img src={flagURL} alt="respective flag" height="200" width="200"/> </div>
            {/*<h2>Weather in {displayList[0].capital}</h2>

            temperture: {weatherData.current.temperature} <br/>
            {weatherData.current.weather_icon}<br/>
            wind: {weatherData.current.wind_speed} direction {weatherData.current.wind_dir}*/}

        </div>
    )
}











function App(){

    const [searchString,setSearchString] = useState('as')
    const [displayList,setDisplayList] = useState([])


    function setAfterSubmission(event){
        event.preventDefault()

        const promise = axios.get(`https://restcountries.eu/rest/v2/name/${searchString}`)
        promise.then (  (response) =>{
            console.log("promise fulfilled")
            setDisplayList(response.data) })

    }


    function handleSearchString(event){
        event.preventDefault()
        setSearchString(event.target.value)
    }



    return (
        <div>
            <form onSubmit = {setAfterSubmission}>
                find countries<br/>
                <input value = {searchString} onChange={handleSearchString}/>
            </form>
            <Display displayList = {displayList} setDisplayList = {setDisplayList}  />
        </div>
    )
}


export default App;