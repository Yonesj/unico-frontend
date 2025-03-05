const emailTest =(value)=>{
const emailPattern = /^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]{2,3}$/g
return emailPattern.test(value)
}


export default {
    emailTest
}