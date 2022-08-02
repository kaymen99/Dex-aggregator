import styled from 'styled-components';

export const NoteNav = styled.nav`
  background: black;
  height: 30px;
  width: 450px;
  text-align: center;
  display: block;
  margin: 0px auto;
  margin-bottom: 80px;
  
  @media (max-width: 32em) {
    width: 250px;
    height: 50px;
    }
  }
`;

export const NavBar = styled.nav`
  text-align: center;
  display: flex;
  margin-left: 10%;

`;

export const Note = styled.div`
  color: white;
  align-text: center;
  font-size: 14px;

`;


