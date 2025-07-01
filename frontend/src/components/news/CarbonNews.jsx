import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarbonNews.css';

const CarbonNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/news/carbon-global`)
      .then(res => setArticles(res.data.articles))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="carbon-news-container">
      <h2>Global Carbon Credit News</h2>
      <div className="news-grid">
        {articles.map((article, idx) => (
  <div className="news-card" key={idx}>
    <img
      src={article.urlToImage || '/cc.jpg'}
      alt={article.title}
    />
    <h3>{article.title}</h3>
    <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
    <a href={article.url} target="_blank" rel="noreferrer">Read more →</a>
  </div>
))}

      </div>
    </div>
  );
};

export default CarbonNews;
