import { Outlet } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h4>회사정보</h4>
                <div style={{ position: 'relative', width: '100%' }}>
                {/* 배경 이미지 */}
                <img 
                    src='/img/info/imgi_52_visual_bg.jpg' 
                    alt='회사 정보 이미지'
                    style={{ width: '100%', display: 'block' }}
                />
                
                {/* 겹칠 이미지 1 */}
                <img 
                    src='/img/info/imgi_5_visual_ttl.png' 
                    alt='title'
                    style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-500%, -50%)',
                    zIndex: 2
                    }}
                />
                
                {/* 겹칠 이미지 2 */}
                <img 
                    src='/img/info/imgi_6_visual_text_20201117.png' 
                    alt='title_2'
                    style={{
                    position: 'absolute',
                    top: '47.5%',
                    left: '50%',
                    transform: 'translate(-400%, -50%)',
                    zIndex: 2
                    }}
                />
                </div>
                <div>
                    <div className='bigBox1' style={{display : 'flex', width : '100%'}}>

                        <div className='box1' style={{width : '50%'}}>
                            <img src='/img/info/imgi_7_lyr1_img1.jpg' alt='info_1' />
                        </div>

                        <div className='box2' style={{backgroundColor : '#2d2d2d', display : 'flex', width : '50%', position : 'relative', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', padding : '50px'}}>
                            <div style={{color : '#ffffff'}} >
                                <h1>바르게 최고가 된다</h1>
                                <br />
                                <div style={{fontFamily : 'nanumsquare', fontweight : 100, lineHeight : '2.0rem'}}>
                                    최고가 아니면<br />
                                    만들어내지 않습니다.
                                </div>
                            </div>
                            <img src='/img/info/imgi_8_lyr1_vtext1.png' alt='verticalTitle_1' style={{height : 200, padding : -10, position : 'absolute', right : 30, top : 30}}/>
                        </div>

                    </div>
                    <div className='bigBox1' style={{display : 'flex', width : '100%'}}>
                        <div className='box3' style={{width : '50%', position : 'relative', display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', padding : '50px'}}>
                            <img src='/img/info/imgi_9_lyr1_vtext2.png' alt='verticalTitle_2' style={{position : 'absolute', left : 30, top : 30}}/>
                            <div>
                                <h1 style={{lineHeight : '4.0rem'}}>전국 최고의 <br /> 초밥 브랜드가 된다</h1>
                                <br />
                                <div style={{fontFamily : 'nanumsquare', fontweight : 100, lineHeight : '2.0rem'}}>
                                    전매장이 직영관리시스템으로 운영되며,<br />
                                    까다로운 관리체계로<br />
                                    가장 건강한 초밥을 만들고 있습니다.
                                </div>
                            </div>
                        </div>
                        <div className='box4' style={{width : '50%', overflow : 'hidden'}}>
                            <img src='/img/info/imgi_10_lyr1_img2.jpg' alt='info_2' />
                        </div>
                    </div>
                </div>

            <Outlet></Outlet>
        </div>
    );
};

export default About;