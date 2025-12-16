/* eslint-disable */
import { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Detail from './components/Detail';
import NotFound from './components/NotFound';
import Member from './components/Member';
import Location from './components/Location';
import About from './components/About';
import Title from './components/Title';
import Footer from './components/Footer';
import Cart from "./components/Cart";
import Board from "./components/Board";
import MenuPage from "./components/MenuPage";
import menuData from "./db/menuData";



function App() {

  const allMenuItems = menuData.flatMap(section => section.items || []);
  const [menu, setMenu] = useState(allMenuItems);
  const [menuSort, setMenuSort] = useState("");
  const navigate = useNavigate();


  const sortByName = () => {
    let sortedMenu = [...menu].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    setMenu(sortedMenu);
  };


  const sortByPriceLowToHigh = () => {
    let sortedMenu = [...menu].sort((a, b) => a.price - b.price);
    setMenu(sortedMenu);
  };


  const sortByPriceHighToLow = () => {
    let sortedMenu = [...menu].sort((a, b) => b.price - a.price);
    setMenu(sortedMenu);
  };


  const sliderImages = [
    process.env.PUBLIC_URL + '/img/slider_image/1.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/2.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/3.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/4.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/5.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/6.jpg',
    process.env.PUBLIC_URL + '/img/slider_image/7.jpg',
  ];


  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);


  const handleSortChange = (val) => {
    console.log('App.js: 정렬 기준 변경 확인 ->', val);
    setMenuSort(val);
    if (val === "low") sortByPriceLowToHigh();
    if (val === "high") sortByPriceHighToLow();
    if (val === "name") sortByName();
  };


  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + "/img/header.png"} alt="헤더 이미지" style={{ width: '30%', margin: 50 }} />
      <Navbar>
        <Container>
          <Nav className="mx-auto justify-content-center menu gap-5 ">
            <Nav.Link onClick={() => { navigate('/') }}>홈으로</Nav.Link>
            <Nav.Link onClick={() => { navigate('/menu') }}>메뉴</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/201') }}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={() => { navigate('/about') }}>회사소개</Nav.Link>
            <Nav.Link onClick={() => { navigate("/Board"); }}> 게시판</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
          <div>
            <div className="slider"
              style={{
                height: "600px",
                backgroundImage: `url(${sliderImages[currentImageIndex]})`,
                transition: "background-image 0.5s ease-in-out"
              }}>
              <div className="slider-text-overlay" >
                <h1>제대로 만든 초밥</h1>
                <h1>가까이 하다</h1>
                <p style={{ letterSpacing: '-0.01rem' }}> 제대로 된 초밥의 대중화를 선도하다.</p>
              </div>
            </div>

            <Title />
            <MenuPage menu={menu} menuSort={menuSort} onSortChange={handleSortChange} />

            <div className="section"
              style={{
                width: '100%',
                height: '1000px',
                backgroundImage: `url(${process.env.PUBLIC_URL + '/img/section.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
              <img src={`${process.env.PUBLIC_URL}/img/vertical.png`} alt="vertical" style={{
                position: 'absolute',
                left: '160px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: 'auto',
                width: 'auto',
                maxHeight: '80%'
              }} />

              <div className="section-text-overlay" style={{
                position: 'absolute',
                top: '75%',
                left: '150px',
                transform: 'translateY(-50%)',
                color: '#000000ff',
                padding: '8px 10px',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 600,
                letterSpacing: '0.04em'
              }}>
                <div style={{ fontSize: '1.2rem', lineHeight: 1.4, textAlign: 'left', fontWeight: '300' }}>
                  올곧은 재료가 올곧은 품질을 만듭니다.
                  <br />
                  믿고 먹을 수 있는 신선한 식재료를 최우선합니다
                </div>
              </div>
            </div>

            <Footer />
          </div>} />

        <Route path="detail/:paramId" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="about" element={<About />} >
          <Route path="member" element={<Member />} />
          <Route path="location" element={<Location />} />
        </Route>

        <Route path="/board" element={<Board />} />
        <Route path="/menu" element={<MenuPage menu={menu} menuSort={menuSort} onSortChange={handleSortChange} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
