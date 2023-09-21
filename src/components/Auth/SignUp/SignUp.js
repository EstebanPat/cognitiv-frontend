import React, { useState } from 'react'

const SignUp = () => {
    const [names, setNames] = useState('');
    const [lastnames, setLastnames] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [identification, setIdentification] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [genre, setGenre] = useState('');
    const [escolaridad, setEscolaridad] = useState('');

  return (
    <div> 
        <h2>REGISTRO</h2>
        <div className='reg-container'>
            <form>
                <div className='reg-form'>
                    <div className='reg-form__row'>
                        
                    </div>
                </div>
            </form>
        </div>

      
    </div>
  )
}

export default SignUp
