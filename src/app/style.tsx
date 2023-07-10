import styled from "@emotion/styled";

const Container = styled('div')`
    background: rgb(237,241,245);
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    @media (max-width: 600px) {
        padding: 0rem;
    }
`;

const H1 = styled('h2')`
    text-align: center;
    color: rgb(100,115,128);
`;

const Content = styled('div')`
    display: inline-grid;
    width: 100%;
`;

const List = styled('div')`
    background: rgb(255, 255, 255);
    border-radius: 5px !important;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 14px 30px rgba(103,132,187, .15),0 4px 4px rgba(103,132,187,.05);
    position: relative;
    text-align: left;
    min-height: 80px;
    color: black;
    grid-template-columns: 80vw;
    grid-gap: 10px;
    cursor: pointer;
    display: flex;
    &:hover {
        transform: scale(1.01) !important;
    }
`;

const Item = styled('span')`
    width: auto;
`;

const Pagination = styled('div')`
    text-align: center;
    padding: 1rem;
`;

const ActPage = styled.button`
    padding: 1rem;
    background: rgb(123,213,85);
    border: 1px solid rgb(255, 255, 255);
    cursor: pointer;
    border-radius: 26rem;
    width: 3rem;
    height: 3rem;
    @media (max-width: 600px) {
        padding: 0rem;
        width: 2.5rem;
        height: 2.5rem;
    }

`;

const FirstPage = ActPage;
const NextPage = ActPage;
const PrevPage = ActPage;
const LastPage = ActPage;

const NumOfPage = styled('span')`
    margin: 0 1rem;
    font-weight: bold;
    padding: 0 0.25rem;
    font-size: 1rem;
`;

const Banner = styled('div')`
    background-image: url('/banner_default.jpg');
    width: 100vw;
    height: 50vh;
    background-size: cover;
    background-position: 50% 35%;
    background-repeat: no-repeat;
    @media (max-width: 600px) {
        height: 25vh;
    }
`;

const ItemContent = styled('div')`
    cursor: pointer;
    width: auto;
    float: left;
    padding: '0.55rem 1rem;
    align-items: center;
    color: rgb(81,97,112);
    @media (max-width: 600px) {
        padding: 0.15rem 0.3rem;
        font-size: 0.8rem;
    }
`;

const CoverDetail = styled('div')`
    width: 17%;
    float: left;
    marginBottom: 5rem;
    @media (max-width: 600px) {
        width: 50%;
        float: left;
        margin-bottom: 0rem;
    }
`;

const DescDetail = styled('div')`
    width: 83%;
    float: left;
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const InnerDescDetail = styled('div')`
    padding: 0 2rem;
    margin-bottom: 5rem;
    @media (max-width: 600px) {
        padding: 0 0;
        font-size: 0.8rem;
    }
`;

const RemoveButton = styled.button`
    padding: 0.75rem;
    background-color: #f00;
    color: #fff;
    font-size: 1rem;
    border-radius: 4px;
    float: right;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(49,54,68,.25);
    cursor: pointer;
    z-index: 99;
    @media (max-width: 600px) {
        font-size: 0rem;
        padding: 0.25rem;
    }
`;

const InnerItem = styled('div')`
    cursor: pointer;
    width: auto;
    float: left;
    padding: 0.55rem 1rem;
    align-items: center;
    color: rgb(81,97,112);
    @media (max-width: 600px) {
        width: 55%;
    }
`;

export {
    Container,
    H1,
    Content,
    List,
    Item,
    Pagination,
    FirstPage,
    NextPage,
    PrevPage,
    LastPage,
    NumOfPage,
    Banner,
    ItemContent,
    CoverDetail,
    DescDetail,
    InnerDescDetail,
    RemoveButton,
    InnerItem
}