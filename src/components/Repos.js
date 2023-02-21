import React from 'react';
import styled from 'styled-components';
import { GithubContext, useGlobalGithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {

const {repos}=useGlobalGithubContext()

// reduce-------------------------------------------------------
let languages=repos.reduce((total,item)=>{

// console.log(item);
// {id: 573553585, node_id: 'R_kgDOIi-7sQ', name: 'E-Learning-Web-Site', full_name: 'MohamedAbdelRazek222/E-Learning-Web-Site', private: false, …}
// console.log({total})
/*
total: 
CSS: {label: 'CSS', value: 2}
HTML: 
{label: 'HTML', value: 1}
JavaScript : 
{label: 'JavaScript', value: 7}
*/
const {language,stargazers_count}=item
// console.log(language)

if(!language ){
  return total
}
if(!total[language]){ // html/css / javascript [{}]
  total[language]={label:language,value:1,stars:stargazers_count}
}else{
  total[language]={
    ...total[language],
    value:total[language].value +1,
    stars:total[language].stars + stargazers_count }
}
return total

},{})

// console.log({languages})
// {JavaScript: {…}, HTML: {…}, CSS: {…}}

// Object.values-----------------------------------------------------
// languages=Object.values(languages).sort((a,b)=>{
const mostUsed=Object.values(languages).sort((a,b)=>{
  return b.value - a.value
}).slice(0,5)
// console.log({languages})
// languages (3) [{…}, {…}, {…}] Array هنا حولها ل 

// most stars per language-------------------------------------------
const mostPopular=Object.values(languages).sort((a,b)=>{
return  b.stars- a.stars
}).map((item)=>{
  return {...item,value:item.stars}
}).slice(0,5)

// stars ,forks , ------------------------------------------------------

let {stars,forks}=repos.reduce((total,item)=>{
const {stargazers_count,name,forks}=item
total.stars[stargazers_count]={label:name,value:stargazers_count}
total.forks[forks] = {label:name,value:forks}
return total
},{

  stars:{},
  forks:{}

})
stars=Object.values(stars).slice(-5).reverse()
forks=Object.values(forks).slice(-5).reverse()

// // chartData------------------------------------------------------
// const chartData = [
//   {
//     label: "Html",
//     value: "13"
//   },
//   {
//     label: "Css",
//     value: "23"
//   },
//   {
//     label: "Javascript",
//     value: "80"
//   },
  
// ];
  return (<section className="section">

<Wrapper className="section-center">
<Pie3D data={mostUsed} />
<Column3D data={stars} />
<Doughnut2D data={mostPopular} />
<Bar3D data={forks} />
</Wrapper>
  </section> )
};
  

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
