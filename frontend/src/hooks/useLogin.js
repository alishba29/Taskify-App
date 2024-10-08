
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  
  const login = async (email, password) => {
  setIsLoading(true);
  setError(null);



  const response = await fetch('http://localhost:5000/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const json = await response.json();
  if (response.ok) {
    localStorage.setItem('user', JSON.stringify(json));
    dispatch({ type: 'LOGIN', payload: json });
    setIsLoading(false);
  } else {
    setIsLoading(false);
    if (response.status === 400) {
      setError("Invalid email or password.");
    } else if (response.status === 409) {
      setError("Email already in use.");
    } else {
      setError("Signup failed. Please try again.");
    }
  }
};




return { login, isLoading, error }
}












// import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

// export const useLogin = () => {
//   const [error, setError] = useState(null)
  
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useAuthContext()

//   const login = async (email, password) => {
//     setIsLoading(true)
//     setError(null)

//     const response = await fetch('http://localhost:5000/user/login', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ email, password })
//     })
//     const json = await response.json()
//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json))

//       // update the auth context
//       dispatch({type: 'LOGIN', payload: json})

//       // update loading state
//       setIsLoading(false)
//     }
//     if (!response.ok) {
//         setIsLoading(false);
//         if (response.status === 400) {
//           setError("Invalid email or password.");
//         } else if (response.status === 409) {
//           setError("Email already in use.");
//         } else {
//           setError("Signup failed. Please try again.");
//         }
//     }

//   }

//   return { login, isLoading, error }
// }