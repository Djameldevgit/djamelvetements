import React, { useEffect, useState } from 'react'
import Posts from '../components/home/Posts'
import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import { useTranslation } from 'react-i18next';
import HeaderCarousel from '../components/HeaderCarousel';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Grid3x3, List } from 'react-bootstrap-icons';

let scroll = 0;

const Home = () => {
    const { homePosts } = useSelector(state => state)
    const { languageReducer } = useSelector(state => state);
    const { t, i18n } = useTranslation('navbar2');
    const lang = languageReducer.language || 'es';
    
    // 🎯 ESTADO PARA CONTROLAR LA VISTA
    const [viewMode, setViewMode] = useState('grid'); // 'grid' (2 columnas) o 'list' (1 columna)
    const [isMobile, setIsMobile] = useState(false);

    // 🎯 DETECTAR SI ES DISPOSITIVO MÓVIL
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    window.addEventListener('scroll', () => {
        if(window.location.pathname === '/'){
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: scroll, behavior: 'smooth'})
        }, 100)
    }, [])

    // 🎯 MANEJAR CAMBIO DE VISTA
    const handleViewChange = (mode) => {
        setViewMode(mode);
        // 🎯 AGREGAR CLASE AL BODY PARA CSS
        document.body.setAttribute('data-post-view', mode);
    }

    return (
        <div>
            <div>
                <HeaderCarousel/>
            </div>
            
            {/* 🎯 BOTÓN DE CAMBIO DE VISTA - SOLO EN MÓVIL */}
            {isMobile && (
                <div className="d-flex justify-content-center my-3">
                    <ButtonGroup size="sm">
                        <Button
                            variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                            onClick={() => handleViewChange('grid')}
                            className="d-flex align-items-center"
                        >
                            <Grid3x3 className="me-1" size={14} />
                            {t('gridView') || 'Grid'}
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                            onClick={() => handleViewChange('list')}
                            className="d-flex align-items-center"
                        >
                            <List className="me-1" size={14} />
                            {t('listView') || 'List'}
                        </Button>
                    </ButtonGroup>
                </div>
            )}
                 
            {
                homePosts.loading 
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                : (homePosts.result === 0 && homePosts.posts.length === 0)
                    ? <h2 className="text-center">{t('NoPost')}</h2>
                    : <Posts viewMode={viewMode} />
            }
        </div>
    )
}

export default Home