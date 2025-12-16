import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from 'react';
import { addItem } from '../store.js'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import menuData from '../db/menuData';




function Detail() {


    const {paramId} = useParams();
    const navigate = useNavigate();  // 페이지 이동을 위한 훅
    const dispatch = useDispatch(); 


    const { selproduct, allProductIds, currentIndex } = useMemo(() => {
        let foundProduct = null;
        const productIds = [];

        menuData.forEach(section => {
            if (section.items) {
                section.items.forEach(item => {
                    productIds.push(item.id);
                    if (item.id === Number(paramId)) {
                        foundProduct = item;
                    }
                });
            }
        });

        return {
            selproduct: foundProduct,
            allProductIds: productIds,
            currentIndex: productIds.indexOf(Number(paramId))
        };
    }, [paramId]);


    // 훅은 조건문(if) 아래에서 호출하면 안 됨 (React가 Hook 순서 기억을 못함)
    if (!selproduct) {
        return <div>해당 상품이 존재하지 않습니다.</div>;
    }


    const { id, name, price, description, image } = selproduct;


    // 이전 상품으로 이동
    const handlePrevClick = () => {
        if (currentIndex > 0) {
            const prevId = allProductIds[currentIndex - 1];
            navigate(`/detail/${prevId}`);
        }
    };


    // 다음 상품으로 이동
    const handleNextClick = () => {
        if (currentIndex < allProductIds.length - 1) {
            const nextId = allProductIds[currentIndex + 1];
            navigate(`/detail/${nextId}`);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={image} width="100%" alt={name} />
                </div>
                <div className="col-md-6">
                    <h5 className="pt-5" style={{ fontSize: '2rem', padding: 30}}>{name}</h5>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'light', color: '#504c4cff'}}>{description}</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: 10 }}>{price.toLocaleString()}원</p>
                    
                    {/* 화살표 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', marginBottom: '30px' }}>
                        <button 
                            onClick={handlePrevClick}
                            disabled={currentIndex === 0}
                            style={{
                                padding: '10px 20px',
                                fontSize: '1.0rem',
                                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                                opacity: currentIndex === 0 ? 0.5 : 1,
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            ← 이전 메뉴
                        </button>

                        <button 
                            onClick={handleNextClick}
                            disabled={currentIndex === allProductIds.length - 1}
                            style={{
                                padding: '10px 20px',
                                fontSize: '1.0rem',
                                cursor: currentIndex === allProductIds.length - 1 ? 'not-allowed' : 'pointer',
                                opacity: currentIndex === allProductIds.length - 1 ? 0.5 : 1,
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px'
                            }}
                        >
                            다음 메뉴 →
                        </button>
                    </div>

                    {/* 주문하기 버튼 */}
                    <button className="btn btn-danger"
                        variant="primary"
                        onClick={() => {
                            const imgFile = image.replace(process.env.PUBLIC_URL + '/img/', '');

                            dispatch(
                                addItem({
                                    id: id,
                                    imgurl: imgFile,
                                    name: name,
                                    count: 1,
                                    price: price
                                })
                            );
                        }}
                        style={{ marginRight: "10px", fontSize: '1.2rem' }}
                    >
                        주문하기
                    </button>
                    <Link to="/cart" >
                        <Button variant="success" style={{ fontSize: '1.2rem' }}>  주문상품 확인하기 </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Detail;
