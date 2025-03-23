const emailTest =(value)=>{
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
return emailPattern.test(value)
}


export default {
    emailTest
}