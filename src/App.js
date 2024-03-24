// import logo from './logo.svg';
import './App.css';

import Navbar from './Component/Navbar';
import News from './Component/News';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'





const App = () => {
  const [progress, setProgress] = useState(0)

  console.log(process.env.REACT_APP_NEWS_API)

  const apiKey = (process.env.REACT_APP_NEWS_API)



  return (
    <>
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={progress}

          />
          <Navbar />
          {/* <News setProgress={setProgress} pageSize={20} country='in' category='sports'/> */}
          <Routes>
            {/* <Route exact path="/" element={<News  key="general" pageSize={20} country='in' category='general'/>}></Route>
          <Route exact path="/business" element={<News  key="business"pageSize={20} country='in' category='business'/>}></Route>
          <Route exact path="/entertainment" element={<News  key="entertainment"pageSize={20} country='in' category='entertainment'/>}></Route>
          <Route exact path="/general" element={<News key="general" pageSize={20} country='in' category='general'/>}></Route>
          <Route exact path="/health" element={<News  key="health"pageSize={20} country='in' category='health'/>}></Route>
          <Route exact path="/science" element={<News key="science" pageSize={20} country='in' category='science'/>}></Route>
          <Route exact path="/sports" element={<News  key="sports"pageSize={20} country='in' category='sports'/>}></Route>
          <Route exact path="/technology" element={<News key="technology" pageSize={20} country='in' category='technology'/>}></Route> */}

            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={20} country='in' category='general' />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={20} country='in' category='business' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={20} country='in' category='entertainment' />}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={20} country='in' category='general' />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={20} country='in' category='health' />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={20} country='in' category='science' />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={20} country='in' category='sports' />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={20} country='in' category='technology' />}></Route>

          </Routes>
        </BrowserRouter>


      </div>
    </>
  )
}


export default App


