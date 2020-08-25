const _ = require("lodash");

const dummy = (blog) => {
  // ...
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return array.length === 0 ? 0 : array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes
      ? favorite
      : {
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
        };
  };

  return array.length === 0 ? {} : array.reduce(reducer, { likes: 0 });
};

// vanilla javascript
const mostBlogs = (array) => {
  const reducer = (aggregator, blog) => {
    const record = aggregator.find((item) => item.author === blog.author);
    const newRecord = record
      ? { ...record, blogs: record.blogs + 1 }
      : { author: blog.author, blogs: 1 };
    // console.log(newRecord);
    // aggregator.push(newRecord);

    if (record) {
      aggregator = aggregator.map((item) =>
        item.author === blog.author ? newRecord : item
      );
    } else {
      aggregator.push(newRecord);
    }

    return aggregator;
  };

  const mostPost = (max, item) => {
    return max.blogs > item.blogs ? max : item;
  };

  const aggregator = array.reduce(reducer, []);

  return array.length === 0 ? {} : aggregator.reduce(mostPost, { blogs: 0 });
};

// with Lodash library
const _mostBlogs = (array) => {
  const _blogs = () => {
    const authorGroup = _.groupBy(array, "author");
    const aggregator = _.transform(
      authorGroup,
      (result, value, author) => {
        result.push({ author, blogs: value.length });
      },
      []
    );
    return _.maxBy(aggregator, "blogs");
  };

  return array.length === 0 ? {} : _blogs();
};

// vanilla javascript
const mostLikes = (array) => {
  const reducer = (aggregator, blog) => {
    const record = aggregator.find((item) => item.author === blog.author);
    const newRecord = record
      ? { ...record, likes: record.likes + blog.likes }
      : { author: blog.author, likes: blog.likes };

    if (record) {
      aggregator = aggregator.map((item) =>
        item.author === blog.author ? newRecord : item
      );
    } else {
      aggregator.push(newRecord);
    }

    return aggregator;
  };

  const mostPost = (max, item) => {
    return max.likes > item.likes ? max : item;
  };

  const aggregator = array.reduce(reducer, []);

  return array.length === 0 ? {} : aggregator.reduce(mostPost, { likes: 0 });
};

// with Lodash library
const _mostLikes = (array) => {
  const _likes = () => {
    const authorGroup = _.groupBy(array, "author");
    const aggregator = _.transform(
      authorGroup,
      (result, value, author) => {
        const customizer = (objValue, srcValue) => {
          if (_.isNumber(objValue)) {
            return objValue + srcValue;
          }
        };
        // console.log(result, value, key);
        var record = _.mergeWith(...value, customizer);
        result.push({ author, likes: record.likes });
      },
      []
    );
    return _.maxBy(aggregator, "likes");
  };

  return array.length === 0 ? {} : _likes();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  _mostBlogs,
  _mostLikes,
};
