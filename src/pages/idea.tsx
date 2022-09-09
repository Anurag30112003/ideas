import { useState } from "react";
import TinderCard from 'react-tinder-card'



export default function Software() {
    const[data, setData] = useState([])
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const prompt = 'Software'
        setLoading(true)

        const response = await fetch('/api/code/idea', {
            method: 'POST',
            body: JSON.stringify({prompt:prompt}),
            headers:{
                "Content-Type": "application/json",
            },

        });
        const result = await response.json();
        let formatted = result.replace(/(\r\n|\n|\\n|\r)/gm, ` \n `);

        setData(formatted);
        setLoading(false)
    }

    const onSwipe = (direction:any) => {
        console.log('You swiped: ' + direction)
        if (direction === 'right') {
            console.log('You liked it')
        }
        else if(direction === 'left') {
            console.log('You disliked it')
        }
      }
      

  return (  
    <>
    <div>
      
        {loading ? <p>Loading...</p> : null}
        <button onClick={handleSubmit}>Generate</button>
        <div className="cardContainer"> 
            <TinderCard className="swipe" onSwipe={onSwipe} preventSwipe={['up', 'down']}
            onSwipeRequirementFulfilled={onSwipe}>
                    <h3>{data}</h3>

            </TinderCard>   
        </div>
    </div>
    </>
  )
}