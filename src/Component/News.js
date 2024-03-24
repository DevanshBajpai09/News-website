import React,{useState,useEffect} from 'react';

import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";





const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)
// document.title=`${props.category}-News `
  
 const updateNews=async()=>{
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResult(parsedData.totalResult)
    
    props.setProgress(100);
    
  }


  useEffect(()=>{
    updateNews();
    // eslint-disable-next-line
  },[]);
  // const componentDidMount=()=> {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=afc07c4abc9b41aaa076be9a0166dec5&page=1&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
  //   // console.log(parsedData);
  //   // this.setState({ articles: parsedData.articles, totalResult: parsedData.totalResult })
  //   updateNews()
  // }
  // const handlePrevClick = async() => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=afc07c4abc9b41aaa076be9a0166dec5&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
    
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles

  //   // })
   
  //   setPage(page-1)
  //   updateNews();

  // }

  // const handleNextClick = async () => {

  //   // if (this.state.page+1>Math.ceil(this.state.totalResult / props.pageSize)) {
  //   // }
  //   // else {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=afc07c4abc9b41aaa076be9a0166dec5&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //   this.setState({loading:true});
  //   //   let data = await fetch(url); ;
  //   //   let parsedData = await data.json()
      
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading:false
  //   //   })
  //   // }
  
  //   setPage(page+1)
  //   updateNews()
  // }
   const fetchMoreData = async() => {
   
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
   
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResult)
    setLoading(false);
    
  }
  




    return (
      <>


     
        <h2 className='text-center'>News on  {`${props.category}`} </h2>
        { loading && <Spinner/>}
   

        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResult}
          loader={<Spinner/>}
        >
          <div className="container">

        <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title?element.title:"" } description={element.description?element.description:"" } imageUrl={element.urlToImage}  newsurl={element.newsUrl} Source={element.source.name}author={element.author}  Time = {element.publishedAt}/>
            </div>

          })}
          </div>
         




        </div>
        </InfiniteScroll>

</>
        

        // {/* <div className="container d-flex justify-content-between">
        //   <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        //   <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResult / props.pageSize)}className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        // </div> */}
        


    )
  }


News.defaultProps={
  country:'in',
  page: 8

}
News.propTypes={
  country:PropTypes.string,
  page : PropTypes.number,
  category:PropTypes.string

}

export default News
