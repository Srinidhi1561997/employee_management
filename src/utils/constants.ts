export const GET_EMPLOYEES = 'GET_EMPLOYEES'
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEES_BY_ID'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const UPDATE_EMPLOYEE_BY_ID = 'UPDATE_EMPLOYEE_BY_ID'
export const DELETE_EMPLOYEE_BY_ID = 'DELETE_EMPLOYEE_BY_ID'
export const randomNumber = `${(Math.floor(Math.random() * 9000000000) + 1).toString().slice(-2)}-`.concat(`${Math.floor(Math.random() * 90000000) + 1}`)
const size = {
  mobileXS: '100px',
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
    mobileXS: `(min-width: ${size.mobileXS}) and (max-width: ${size.mobileS})`,
    mobileS: `(min-width: ${size.mobileS}) and (max-width: ${size.tablet})`,
    mobileM: `(min-width: ${size.mobileM}) and (max-width: ${size.mobileL})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet}) and (max-width: ${size.laptopL})`,
    laptop: `(min-width: ${size.laptop}) and (max-width: ${size.desktop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  };