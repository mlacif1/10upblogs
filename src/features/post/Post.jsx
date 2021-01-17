import React, { useEffect, useState } from "react";
import { fetchAuthor } from "../../api/postsApi";
import "./Post.css";

export const Post = (props) => {
  const { renderedTitle, date, authorHref, renderedContent, id } = props;

  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchAuthor(authorHref)
      .then(({ data }) => {
        setAuthor(data.name);
      })
      .catch((e) => {
        console.log(e);
        setAuthor("");
      });
  }, [authorHref]);

  return (
    <article
      key={id}
      itemScope
      itemType="http://schema.org/BlogPosting"
      className="post"
    >
      <header>
        <h2 itemProp="headline">{renderedTitle}</h2>
        <div className="date">
          <strong>Publish Date</strong>:
          <span itemProp="datePublished">
            <time dateTime={date}>{date}</time>
          </span>
        </div>
        {author && (
          <div className="author">
            <strong>Author</strong>:<span itemProp="author">{author}</span>
          </div>
        )}
      </header>

      <div
        itemProp="articleBody"
        className="content"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      ></div>
    </article>
  );
};
