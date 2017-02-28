function PostManager(esClient) {
  this.client = esClient;
};

PostManager.prototype.addPost = function (type, post) {
  return new Promise(function (resolve, reject) {

    let opts = {
      index: 'esindex',
      type: 'post',
      body: {
        type : type,
        itemID : post.itemID,
        title : post.title,
        linkURL : post.linkURL,
        content : post.content,
        timestamp : new Date(Date.now())
      }
    };

    this.client.index(opts)
      .then((res) => {
        resolve(post);
      })
      .catch((err) => {
        console.error(err);
      });

  }.bind(this));
};

module.exports = PostManager;