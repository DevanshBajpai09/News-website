import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowUpRight, Newspaper } from "lucide-react";
import { format } from "date-fns";

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, Time, Source } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
        {/* Image with fallback */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={imageUrl || "https://placehold.co/600x400?text=No+Image"}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=No+Image";
            }}
          />
          <Badge className="absolute top-2 right-2 capitalize" variant="secondary">
            {Source || "Unknown"}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="text-primary">
              <Newspaper className="h-3 w-3 mr-1" />
              New
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {Time ? format(new Date(Time), "PPp") : "Unknown date"}
            </div>
          </div>
          <CardTitle className="line-clamp-2 text-base">
            {title || "No title available"}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow pb-2">
          <CardDescription className="line-clamp-3">
            {description || "No description available"}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            {author && (
              <>
                <User className="h-3 w-3 mr-1" />
                <span className="line-clamp-1">{author}</span>
              </>
            )}
          </div>
          
          <Button asChild variant="outline" size="sm" className="gap-1">
            <a 
              href={newsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Read more <ArrowUpRight className="h-3 w-3" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NewsItem;