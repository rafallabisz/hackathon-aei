import React, { Component } from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading';
import Paragraph from 'components/atoms/Paragraph';
import PieChart from 'components/molecules/PieChart';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { FaThumbsUp } from 'react-icons/fa';

const Wrapper = styled.div`
  min-height: 200px;
  max-height: 40vh;
  background-color: ${({ theme }) => theme.grey};
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.5);
  border-radius: 10px;
  overflow: hidden;
  /* cursor: pointer; */
`;

const StyledImage = styled.div`
  position: relative;
  background-image: url(${({ urlToImage }) => urlToImage});
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px 10px;
  line-height: 20px;
  text-shadow: 4px 4px 6px ${({ theme }) => theme.black};

  color: ${({ theme }) => theme.grey};  
  /* border-bottom: 1px solid ${({ theme }) => theme.black}; */
`;

const StyledParagraph = styled(Paragraph)`
  padding: 10px;
  cursor: pointer;
`;

const StyledIconCircle = styled(FaThumbsUp)`
  width: 40px;
  height: 40px;
  background-color: white;
  padding: 4px;
  border-radius: 50%;
  color: ${({ unlike }) => unlike || '#28CC45'};
  margin: 10px 10px 0 10px;
  transform: ${({ rotate }) => rotate && 'rotate(180deg)'};
  transition: 0.2s linear;
  cursor: pointer;
  &:hover {
    color: ${({ unlike }) => (unlike ? '#D91500' : '#008A4F')};
    transform: scale(1.2, 1.2) ${({ rotate }) => rotate && 'rotate(180deg)'};
  }
`;
const WrappStyledIcon = styled.div`
  display: flex;
  flex-direction: column;
`;
class Card extends Component {
  state = {
    redirect: false,
  };

  handleClick = () => this.setState({ redirect: true });

  render() {
    const { redirect } = this.state;
    const {
      title,
      url,
      urlToImage,
      content,
      likeArticle,
      unlikeArticle,
      fakeindicator = 1,
    } = this.props;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: routes.detailsPage,
            item: { title, url, urlToImage, content },
          }}
        />
      );
    }

    return (
      <Wrapper>
        <StyledImage urlToImage={urlToImage}>
          <WrappStyledIcon>
            <StyledIconCircle onClick={() => likeArticle(title)} />
            <StyledIconCircle onClick={() => unlikeArticle(title)} unlike="red" rotate="true" />
          </WrappStyledIcon>
          <PieChart title={title} />
          <StyledHeading>{title}</StyledHeading>
        </StyledImage>
        <StyledParagraph onClick={this.handleClick}>
          {content && `${content.slice(0, 100)}...`}
        </StyledParagraph>
      </Wrapper>
    );
  }
}

export default Card;
