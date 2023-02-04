
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const NAME_REGEX = /^[A-Za-z ]+$/i
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export { PWD_REGEX, NAME_REGEX, EMAIL_REGEX }