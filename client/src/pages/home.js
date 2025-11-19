import React, { useEffect } from 'react'

 
import Posts from '../components/home/Posts'
 
import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
 
import { useTranslation } from 'react-i18next';
import HeaderCarousel from '../components/HeaderCarousel';
 
let scroll = 0;

const Home = () => {
    const { homePosts } = useSelector(state => state)
    const { languageReducer } = useSelector(state => state);
  const { t, i18n } = useTranslation('navbar2');
  const lang = languageReducer.language || 'es';
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
    },[])

    return (
        <div >
      <div>
        <HeaderCarousel/>
      </div>
                 
                {
                    homePosts.loading 
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                    : (homePosts.result === 0 && homePosts.posts.length === 0)
                        ? <h2 className="text-center">{t('NoPost')}</h2>
                        : <Posts />
                }
                
          
            
         
        </div>
    )
}

export default Home
