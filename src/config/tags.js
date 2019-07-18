const tags = collection => {
  let tagSet = new Set();
  collection.getAll().forEach(item => {
    if( "tag" in item.data ) {
      let tags = item.data.tag;

      tags = tags.filter(item => {
        switch(item) {
          // this list should match the `filter` list in tags.ejs
          case "all":
          case "tags":
          case "feed":
          case "posts":
            return false;
        }

        return true;
      });

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet];
};

module.exports = tags;