import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext, useGlobalGithubContext } from '../context/context';
const Dashboard = () => {
  const {isLoading}=useGlobalGithubContext()

  if(isLoading){

    return <main>

      <Navbar />
      <Search />
      <img src={loadingImage} className="loading-img" alt="" />
    </main>
  }
  return (

    <main>
    <Navbar></Navbar>
    <Search />
    <Info />
    <User />
    <Repos />
    
    </main>
  );
};

export default Dashboard;
