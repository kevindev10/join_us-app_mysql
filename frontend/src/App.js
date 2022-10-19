
import React, { useEffect, useState } from 'react'



function App() {

    const [email, setEmail] = useState('');
    const [count, setCount] = useState(0)

useEffect(() =>{
    const getCount = async () => {
      const data = await fetch('http://localhost:5000/count')
      const users= await data.json()
      const count = users.countArray.COUNT
      setCount(count)
    }
  
    getCount()
})

const handleChange = (e) =>{
    setEmail(e.target.value)
}
const handleSubmit = (e) =>{
  e.preventDefault();
 
  if(email){
  
    fetch('http://localhost:5000/user', {
    
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
      
    })
    
    .then(response => response.json())
    .then (users=> {
      const count = users.countArray.COUNT
      setCount(count)
    })

  }else{
   alert('Enter a valid email address')
    
  }

  setEmail('')
}

  return (
    <>
       <div className="flex-container">
          <div className="container">
              <h1>JOIN US</h1>
              <p className="lead">Enter your email to join <strong>{count}</strong> others on our waitlist. We are 100% not a cult. </p>
              <form onSubmit={handleSubmit}>
                  <input
                   type="email" 
                   name="email" 
                   className="form"
                   placeholder="Enter Your Email" 
                   onChange={handleChange} 
                   value= {email}
                    />
                  <button type='submit'>Join Now</button>
              </form>
          </div>
       </div>
   
    </>
  )
}

export default App