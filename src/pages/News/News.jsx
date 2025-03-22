import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./News.module.css";
import BlogNew from "../../components/BlogNew/BlogNew";
import SideBar from "../../components/SideBar/SideBar";

const News = () => {
  const [articles, setArticles] = useState([]);
  const apiKey = import.meta.env.VITE_NEWS_KEY;
  console.log(apiKey);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(response);
        if (data.status === "ok") {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
    <div className={styles.top}>
       <img src="/logoFullWhite.png" alt="Inkspire" className={styles.image} />
    </div>
      <div className={styles.left}>
        <SideBar />
      </div>
      <div className={styles.container}>
        {articles.length > 0 ? (
          articles.map((element) => (
            <BlogNew
              key={element.url}
              title={element.title}
              imgBackground={element.urlToImage}
              creator={element.source.name}
              url={element.url}
            />
          ))
        ) : (
          <p>No hay noticias disponibles</p>
        )}
      </div>
    </>
  );
};
export default News;
