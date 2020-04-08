const express = require('express');
const router = express.Router();
const Db = require('../data/db')



router.get('/', (req, res) => {
    Db.find(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the Post",
      });
    });
});
router.post('/', (req, res) => {
    Db.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error adding the post",
      });
    });
});


router.get('/:id', (req, res) => {
    Db.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hub",
      });
    });
});
router.delete('/:id', (req, res) => {
    Db.remove(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })  
    .catch((err) => {
      res.status(500).json({ error: "something failed, sorry" });
    });
});
router.put('/:id', (req, res) => {
    Db.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        Db.findById(req.params.id)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ errorMessage: "error reading the updated Post" });
          });
      } else {
        res.status(404).json({ message: "The Post could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating the Post",
      });
    });
});

router.get('/:id/comments', (req, res) => {
    Db.findPostComments(req.params.id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "error reading comments" });
    });
});
router.post('/:id/comments', (req, res) => {
        Db.insertComment(req.body)
        .then((comment) => {
          res.status(201).json(comment);
        })
        .catch((err) => {
          res.status(500).json({ errorMessage: "error adding comment" });
        });  
});

module.exports = router

