const Post = require('../models/Post')

module.exports = {
  async index (req, res) {
    try {
      const posts = await Post.find({})
      res.send(posts)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the posts'
      })
    }
  },
  async create (req, res) {
    try {
      const post = await new Post(req.body)
      post.save()
      res.send(post)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a post'
      })
    }
  },
  async delete (req, res, next) {
    await Post.findByIdAndRemove({_id: req.params.id}, (err,posts) => {
      if(err) res.json(err)
      else res.json('Post succesfully removed')
    })
  }
}
