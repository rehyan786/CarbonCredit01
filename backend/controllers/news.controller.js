// // const axios = require('axios');
// // require('dotenv').config();

// // const getCarbonNews = async (req, res) => {
// //   try {
// //     const response = await axios.get('https://newsapi.org/v2/everything', {
// //       params: {
// //         q: 'carbon credit OR carbon offset OR carbon market OR emissions trading',
// //         language: 'en',
// //         sortBy: 'publishedAt',
// //         pageSize: 20,
// //         apiKey: process.env.NEWS_API_KEY,
// //       },
// //     });

// //     res.json({ articles: response.data.articles });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Failed to fetch news' });
// //   }
// // };

// // module.exports = { getCarbonNews };

// const axios = require('axios');
// require('dotenv').config();

// const getCarbonNews = async (req, res) => {
//   try {
//     const response = await axios.get('https://newsapi.org/v2/everything', {
//       params: {
//         q: `"carbon credit" OR "carbon credits" OR "carbon market" OR "emissions trading"`,
//         language: 'en',
//         sortBy: 'publishedAt',
//         pageSize: 30,
//         apiKey: process.env.NEWS_API_KEY,
//       },
//     });

//     res.json({ articles: response.data.articles });
//   } catch (err) {
//     console.error('Error fetching news:', err.message);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// };

// module.exports = { getCarbonNews };


const axios = require('axios');
require('dotenv').config();

const getCarbonNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: `"carbon credit" OR "carbon market" OR "emissions trading"`,
        language: 'en',
        sortBy: 'publishedAt', // latest first
        pageSize: 40,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    const articles = response.data.articles;

    // Boost relevance manually
    const boosted = [];
    const others = [];

    articles.forEach(article => {
      const content = `${article.title} ${article.description || ''}`.toLowerCase();
      if (
        content.includes('carbon credit') ||
        content.includes('carbon credits') ||
        content.includes('carbon market') ||
        content.includes('carbon markets')
      ) {
        boosted.push(article);
      } else {
        others.push(article);
      }
    });

    const sortedArticles = [...boosted, ...others];

    res.json({ articles: sortedArticles });
  } catch (err) {
    console.error('Error fetching news:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

module.exports = { getCarbonNews };
