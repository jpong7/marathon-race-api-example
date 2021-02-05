const express = require('express')
const router = express.Router()

const fib = (num) => {
  if (num <= 2) return 1
  return fib(num - 2) + fib(num - 1)
}

const arrayMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr
}

const getUnique = (arr) => {
  let uniqueArray = []
  for (i = 0; i < arr.length; i++) {
    if (uniqueArray.indexOf(arr[i]) === -1) {
      uniqueArray.push(arr[i])
    }
  }
  return uniqueArray
}

const secondMax = (arr) => {
  arr = getUnique(arr) //remove duplicate value in array
  let max = Math.max.apply(null, arr) // get the max of the array
  arr.splice(arr.indexOf(max), 1) // remove max from the array
  return Math.max.apply(null, arr) // get the 2nd max
}

const fizzBuzz = (input) => {
  return (output =
    input % 3 === 0 && input % 5 === 0
      ? 'FizzBuzz'
      : input % 3 === 0
      ? 'Fizz'
      : input % 5 === 0
      ? 'Buzz'
      : '')
}

router.get('/fibonacci/:input', function (req, res) {
  res.json({ output: fib(req.params.input) })
})

router.get('/array-shift', function (req, res) {
  res.json({ output: arrayMove([1, 2, 3], 0, 1) })
})

router.get('/second-max', function (req, res) {
  let arr = [20, 120, 111, 215, 54, 78, 215]
  res.json({ outpur: secondMax(arr) })
})

router.get('/fizz-buzz/:input', function (req, res) {
  res.json({ output: fizzBuzz(req.params.input) })
})

module.exports = router
