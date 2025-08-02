import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';

import { Badge } from '../components/ui/badge';
import { format } from 'date-fns';
import { Newspaper, Clock, User, ArrowUpRight } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

const News = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const updateNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);
      setError(null);
      
      const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&category=${props.category}&country=${props.country}${nextPage ? '&page=' + nextPage : ""}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      props.setProgress(70);
      
      if (data.results) {
        setResults(data.results);
        setTotalResults(data.totalResults || 0);
        setNextPage(data.nextPage);
      }
      
      props.setProgress(100);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message || 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.country]);

  const fetchMoreData = async () => {
    if (!nextPage) return;
    
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&category=${props.category}&country=${props.country}&page=${nextPage}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results) {
        setResults(prev => [...prev, ...data.results]);
        setNextPage(data.nextPage);
      }
    } catch (err) {
      console.error('Error fetching more news:', err);
    }
  };

  const NewsItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="capitalize">
              {item.source_id || 'Unknown'}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {item.pubDate ? format(new Date(item.pubDate), 'PPp') : 'Unknown date'}
            </div>
          </div>
          <CardTitle className="line-clamp-2">
            {item.title || 'No title available'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow">
          {item.image_url && (
            <motion.div 
              className="relative aspect-video mb-4 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x400?text=No+Image';
                }}
              />
            </motion.div>
          )}
          
          <CardDescription className="line-clamp-3">
            {item.description || 'No description available'}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            {item.creator && (
              <>
                <User className="h-4 w-4 mr-1" />
                <span>{item.creator.join(', ')}</span>
              </>
            )}
          </div>
          
          <Button asChild variant="outline" size="sm">
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Read more <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-1/4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      ><div className="flex flex-col items-center gap-4 mb-4 mt-10 text-center mx-auto">
      
      <h1 className="text-3xl font-bold tracking-tight">
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)} News
      </h1>
    </div>

    <p className="text-muted-foreground text-center">
      Latest updates from around the world in the {props.category} category
    </p>
      </motion.div>

      {error && (
        <div className="bg-destructive/10 p-4 rounded-lg border border-destructive text-destructive mb-6">
          Error: {error}. Please try again later.
        </div>
      )}

      <InfiniteScroll
        dataLength={results.length}
        next={fetchMoreData}
        hasMore={results.length < totalResults}
        loader={<LoadingSkeleton />}
        endMessage={
          <p className="text-center text-muted-foreground py-8">
            You've reached the end of today's news
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading && results.length === 0 ? (
              <LoadingSkeleton />
            ) : (
              results.map((item, index) => (
                <NewsItem key={`${item.link}-${index}`} item={item} />
              ))
            )}
          </AnimatePresence>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func
};

export default News;