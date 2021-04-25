const newsUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.news_key}`;

const resolvers = {
  Query: {
    news: async () => {
      const response = await fetch(newsUrl);
      const { articles } = await response.json();
      return articles;
    },
  },
};

module.exports = resolvers;
