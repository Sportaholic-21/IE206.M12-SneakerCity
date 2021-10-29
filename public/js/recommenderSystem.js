const {spawn} = require('child_process')

const childPython = spawn('python', ['Recommender.py'])

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
})