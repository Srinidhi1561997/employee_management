import styled from 'styled-components'

const Container = styled.div`
    margin: 0px;
`

const Header = styled.h2`
    margin: 15px 0px;
`

const FormWrapper = styled.form`
    margin: 20px 15px;
`

const DetailsInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    color: 'white';
    font-size: 1em;
    margin: 10px;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

export default {
    Container,
    Header,
    FormWrapper,
    DetailsInputContainer,
    InputContainer,
    Button,
}
