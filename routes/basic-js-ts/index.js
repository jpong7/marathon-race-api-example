const express = require('express')
const router = express.Router()

const fib = (num) => {
  if (num <= 2) return 1
  return fib(num - 2) + fib(num - 1)
}

function moveon(arr, direction, n) {
  var times = n > arr.length ? n % arr.length : n;
  console.log("times", times)
  return arr.concat(arr.splice(0, (direction > 0 ? arr.length - times : times)));
}

router.get('/fibonacci/:input', function (req, res) {
  res.json({ output: fib(req.params.input) })
})

router.get('/array-shift/:input1/:input2/:input3', function (req, res) {
  //const array1 = ['john', 'jane', 'sarah', 'alex']
  console.log(moveon(['john', 'jane', 'sarah', 'alex'], 0, 2)); 
})

module.exports = router
