import './Home.css';
import React from 'react'
import Live from './Live.js'
import MainNav from './MainNav.js'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

function Home() {
  return (
    <div className="home">
	<Live />
	<div style={{position:'fixed', backgroundAttachment: 'scroll', top:'50%', width:'100%', backgroundColor: 'rgb(100,100,100)'}}>
	 <MainNav />
	<div style={{position:'fixed', backgroundAttachment: 'scroll',backgroundColor:'rgb(220,220,220)', top:'50%', left:'10%', width:'80%'}}>
	  <p> Name is nate richman </p>
	  </div>
	  </div>
    </div>
  );
}

export default Home;
