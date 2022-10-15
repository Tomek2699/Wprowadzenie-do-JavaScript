const number1 = document.querySelector('#number1')
const number2 = document.querySelector('#number2')
const number3 = document.querySelector('#number3')
const sum = document.querySelector('#sum')
const average = document.querySelector('#average')
const min = document.querySelector('#min')
const max = document.querySelector('#max')

const calculateBtn = document.querySelector('#calculate')

calculateBtn.addEventListener('click', () => {
    sum.innerHTML = 'Sum: '+ (parseInt(number1.value) + parseInt(number2.value) + parseInt(number3.value))
    average.innerHTML = 'Average: ' + (parseInt(number1.value) + parseInt(number2.value) + parseInt(number3.value)) / 3
    min.innerHTML = 'Min: ' + Math.min(parseInt(number1.value), parseInt(number2.value), parseInt(number3.value))
    max.innerHTML = 'Max: ' + Math.max(parseInt(number1.value), parseInt(number2.value), parseInt(number3.value))
})