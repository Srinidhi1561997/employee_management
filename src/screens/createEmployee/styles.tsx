import styled from 'styled-components'

const InputBox = styled.div`
    margin-bottom: 20px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 20px;
`
const OuterDiv = styled.div`
    display: flex;
    flex-direction: row;
`
const InnerDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // background-color: red;
    padding: 10px;
`
const InputTitle = styled.label`
    font-weight: bold;
    // margin-bottom: 5px;
    display: inline;
    align-self: center;
    justify-content: center;
    // background-color: cyan;
    width: 40%;
`

const Input = styled.input`
    height: 45px;
    width: 250px;
    outline: none;
    border-radius: 5px;
    border: 1px solid #cccccc;
    padding-left: 15px;
    font-size: 16px;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
    width: 60%;
`
const SpanAsterisk = styled.span`
    color: red;
    font-size: 18px;
`
export default { InputBox, InputTitle, Input, OuterDiv, InnerDiv ,SpanAsterisk}
