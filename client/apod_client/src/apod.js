import {useEffect,useState} from 'react'
import axios from 'axios';

export function Apod(){
    const [data, setData]= useState()
    const [oldData,setOldData]= useState()
    const [random,setRandom]= useState(false)
    
    async function fetchData(date){
        setOldData(data)
        setData()
        try{
            const res = await axios.get(`http://localhost:5000/api/date/${date}`)
            if(res){
                setData(res.data)
            }
        }catch(err){
            console.error(err)
        }
    }
    
    useEffect(()=>{
    const day =new Date()
        day.setHours(day.getHours() -5)
        let date = day.toISOString().slice(0,10)
        fetchData(date)
    },[])

    useEffect(() => {
       if(random){
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            const result= Math.floor(Math.random() * (max - min) + min);
            return result.toString().padStart(2,0)
          }
          
        fetchData(`${getRandomInt(1996,2021)}-${getRandomInt(1,12)}-${getRandomInt(1,28)}`)

        const interval = setInterval(() =>{
            const year = getRandomInt(1996,2021)
            const month =  getRandomInt(1,12)
            const day = getRandomInt(0,31)
            try{
                fetchData(`${year}-${month}-${day}`)
            }catch{
            fetchData(`${year}-${month}-${day}`)
            }
        },60000);
        return () => {
          clearInterval(interval);
        };
    }
      }, [random]);

    return(
        <div className="container">
           {data ? (
           <div  >
            <h3>{data.title}</h3>
            <span className="date">{data.date}</span>
            <br />
            {data.media_type === 'image' && (
                <a href={data.hdurl}><img src={data.url} alt={data.title} className="img" /></a>
            )}
            {data.media_type === 'video' && (
                <iframe src={data.url}
                frameborder='0'
                allow='autoplay; encrypted-media'
                allowfullscreen
                title='video'
                className="vid"
                />
            )}
            <br />
            {data.copyright && (
            <span className="copyright">© {data.copyright}</span>
            )}
            <p>{data.explanation}</p>
            {oldData &&(
                <button 
                className="slide__btn" 
                onClick={()=>{
                    let temp = data
                    setData(oldData)
                    setOldData(temp)
                        setRandom(false)
                }}>Get Previous Image</button>
            )}
            <br />
            <button 
            className="slide__btn" 
            onClick={()=>{
                setRandom(true)
                setTimeout(()=>{
                    setRandom(false)
                },5)
            }}>Get Random Image</button>
            <br />
            <button 
            className="slide__btn" 
            style={{backgroundColor:random ?"red":"#5d7fb9"}} 
            onClick={()=>{setRandom(!random)}}>{random ? 'Stop Slideshow':'Start Random Slideshow!'}
            </button>
           </div>
           ):(
           <div>
               <span>Loading...</span>               
           </div>) }
        </div>
    )
}