const nameForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#result')

nameForm.addEventListener('submit', (e) => {
    e.preventDefault()  //잘못입력되지 않게 방지
    const name = search.value //name 변수에 input value를 저장
    messageOne.innerText = name //name 변수 값 출력하기
})