import React ,{useState, useRef, useEffect} from 'react';
import './UserForm.css';
export default function UserForm() {

    const [ openForm , setOpenForm ] = useState(false);
    const [ username , setUsername ] = useState('');
    const formRef = useRef(null);

    const handleSubmit =(event)=>{
      event.preventDefault();

      const email = event.target.elements.email.value;
      const phone = event.target.elements.phone.value;
      const dob = event.target.elements.date.value;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;      
      if(!emailPattern.test(email)){
        alert('Invalid email. Please check your email address.')
        return;
      }
      const phonePattern = /^\d{10}$/;
      if(!phonePattern.test(phone)){
        alert('Invalid phone. Please check yourInvalid phone number. Please enter a 10-digit phone number')
        return;
      }
      const today = new Date();
      const inputDate = new Date(dob);
      if(inputDate>today){
        alert('Invalid date of birth. Date of birth cannot be in the future.')
      }
    }

    const handleOutside =(event)=>{
      if(formRef.current && !formRef.current.contains(event.target)){
        setOpenForm(false);
      };
    }
    useEffect(()=>{
      document.addEventListener('mousedown',handleOutside)
        return ()=>{
          document.removeEventListener('mousedown',handleOutside);
        }      
    },[formRef])
   
  return (
    <>  <div className='heading'>
         <h1>User Details Modal</h1>
        <button onClick={()=>setOpenForm(true)} className="openbtn">Open Form</button>
    </div>
       
        <div ref={formRef} className="modal">
        { openForm && 
          
        <form  className='modal-content' onSubmit={handleSubmit}>
          <h2>Fill Details</h2>
            <label htmlFor="username"><b>Username</b></label>
              <input type="text" id='username' name='username' required  />
            <label htmlFor="email"><b>Email Address</b></label>
              <input type="text" id="email" name='email' value={username} onChange={(e)=>setUsername(e.target.value)} title={`Please include @ in email address. @${username} is missing an @.`} required pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' />
            <label htmlFor="phone"><b>Phone Number</b></label>
              <input type="text" id="phone" name='phone' required />
            <label htmlFor="dob"><b>Date of Birth</b></label>
              <input type="date" id="dob" name='date' required />
            <div class="submit-container">
            <button type="submit" className='submit-button'>Submit</button>
            </div>   
        </form>}
    </div>
    </>
  )
}

