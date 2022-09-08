import { useState } from "react";


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

  return (  
    <>
    <div>
        {loading ? <p>Loading...</p> : null}
        <div>{data}</div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}