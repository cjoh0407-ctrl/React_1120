import { useState, useEffect } from 'react';
import menuData from '../db/menuData';
import MenuItem from './MenuItem';
import Sort from './Sort';
import { Container, Nav } from 'react-bootstrap';

const MenuPage = ({ menuSort = "", onSortChange }) => {
    
    const [selectedCategory, setSelectedCategory] = useState("전체 메뉴");
    const [sortedData, setSortedData] = useState(menuData);

    const filteredData = selectedCategory === "전체 메뉴"
        ? sortedData
        : sortedData.filter(section => section.category === selectedCategory);

    console.log('selectedCategory:', selectedCategory);
    console.log('filteredData:', filteredData);

    useEffect(() => {
        let newSortedData = [...menuData];

        if (menuSort) {
            newSortedData = newSortedData.map(section => {
                if (section.items) {
                    const sortedItems = [...section.items];
                    if (menuSort === 'low') {
                        sortedItems.sort((a, b) => a.price - b.price);
                    } else if (menuSort === 'high') {
                        sortedItems.sort((a, b) => b.price - a.price);
                    } else if (menuSort === 'name') {
                        sortedItems.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                    }
                    return { ...section, items: sortedItems };
                }
                return section;
            });
        }

        setSortedData(newSortedData);
    }, [menuSort]);

    console.log('MenuPage rendering 테스트테스트');

    return (
        <div className="menu-page py-5">
            <Container>
                <div className="d-flex justify-content-end mb-3">
                    <Sort value={menuSort} onChange={onSortChange} />
                </div>
                <Nav className="justify-content-center mb-5 bg-white py-3 " style={{ zIndex: 100 }}>
                    {menuData.map((section) => (
                        <Nav.Item key={section.id}>
                            <Nav.Link
                                onClick={() => setSelectedCategory(section.category)}
                                className={`fw-bold px-3 ${selectedCategory === section.category ? 'active' : 'text-dark'}`}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    color: selectedCategory === section.category ? '#f5426c' : undefined,
                                    borderBottom: selectedCategory === section.category ? '2px solid #f5426c' : undefined
                                }}
                            >
                                {section.category}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>

                {filteredData.map((section) => {
                    if (!section.items || section.items.length === 0) return null;

                    return (
                        <div id={`category-${section.id}`} key={section.id} className="mb-5 category-section">
                            <h3 className="border-bottom pb-2 mb-4 border-dark">{section.category}</h3>
                            <div className="row">
                                {section.items.map((item) => (
                                    <MenuItem key={item.id} id={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
};

export default MenuPage;
