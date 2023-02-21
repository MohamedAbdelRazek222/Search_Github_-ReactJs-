import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext=React.createContext()

// provider,Consumer - GithubContext.provider

const GithubProvider =({children})=>{
const [githubUser,setGithubUser]=useState(mockUser)
const [repos,setRepos]=useState(mockRepos)
const [followers,setFollowers]=useState(mockFollowers)
// request laoding
const [requests,setRequests]=useState(0)
const [isLoading,setIsLoading]=useState(false)
// error
const [error,setError]=useState({show:false,msg:""})

const searchGithubUsers=async(user)=>{
// toggle ERROR
toggleError()
setIsLoading(true)
// SET loading
const response =await axios(`${rootUrl}/users/${user}`).catch(err=>console.log(err))
if(response){
 
  setGithubUser(response.data)
  const {login,followers_url}=response.data
  // repos
//  await  .then(response =>setRepos(response.data))
  // followers
  // await axios(`${followers_url}?per_page=100`).then(response =>setFollowers(response.data))

await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${followers_url}?per_page=100`)]).then((results)=>{
  console.log({results})
  const [repos,followers]=results
  const status='fulfilled'
  if(repos.status === status){
    setRepos(repos.value.data)
  }
  if(followers.status === status){
    setFollowers(followers.value.data)
  }
})
}else{
  toggleError(true,`there is no user with that user name`)
}
checkRequets()
setIsLoading(false)
}
// check rate---------------------------------------
const checkRequets=()=>{
axios(`${rootUrl}/rate_limit`).then((data)=>{

// console.log({data})//{data: {…}, status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
let {data:{rate:{remaining}}}=data
setRequests(remaining)

if(remaining === 0){
// throw error
toggleError(true,"sorry you hae exceeded your hourly rate limit")
}
}).catch((err)=>console.log(err))
}
// toggleError-----------------------------------------------
function toggleError(show=false,msg=''){

setError({show,msg})

}

// Error
useEffect(()=>{

checkRequets()

},[])


return <GithubContext.Provider value={{ 
    githubUser,
    followers,
    repos,
    requests,
    error,
    searchGithubUsers,
    isLoading,


 }}>{children}</GithubContext.Provider>
}

export const useGlobalGithubContext = () => {
    return React.useContext(GithubContext)
  }
  


export {GithubProvider,GithubContext}