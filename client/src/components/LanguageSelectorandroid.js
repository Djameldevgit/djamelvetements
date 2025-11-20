import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import * as languageActions from '../redux/actions/languageAction';
import { Dropdown } from 'react-bootstrap';
import { FaGlobe, FaCheck } from 'react-icons/fa';

const LanguageSelectorandroid = ({ isMobile, inDropdown = false }) => {
  const dispatch = useDispatch();
  const { languageReducer } = useSelector(state => state);
  const { t, i18n } = useTranslation('language');
  const [cookies, setCookie] = useCookies(['language']);
  const lang = languageReducer?.language || 'fr';

  const handleLanguageChange = useCallback((language) => {
    if (language === lang) return;

    dispatch(languageActions.changeLanguage(language));
    setCookie('language', language, { path: '/' });
    i18n.changeLanguage(language);
    
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }, [dispatch, setCookie, lang, i18n]);

  useEffect(() => {
    const defaultLanguage = cookies.language || 'fr';
    if (defaultLanguage !== languageReducer?.language) {
      dispatch(languageActions.changeLanguage(defaultLanguage));
      i18n.changeLanguage(defaultLanguage);
    }
  }, [cookies.language, languageReducer?.language, dispatch, i18n]);

  const flagPath = (lang) => `/flags/${lang}.png`;

  const languageNames = {
    fr: 'Français',
    ar: 'العربية',
  };

  // 🔥 VERSIÓN SOLO PARA DROPDOWN - ELIMINADA VERSIÓN MÓVIL
  if (inDropdown) {
    return (
      <div style={{
        padding: '7px 10px',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.2)', // 🔥 BORDE AGREGADO AL CONTENEDOR PADRE
        borderRadius: '8px', // 🔥 ESQUINAS REDONDEADAS
        margin: '8px', // 🔥 MARGEN PARA SEPARACIÓN
        marginBottom: '12px' // 🔥 MÁS MARGEN ABAJO
      }}>
      
        
        {/* SELECTOR DE IDIOMA */}
        <Dropdown style={{ width: '100%' }}>
          <Dropdown.Toggle 
            variant="outline-light"
            id="dropdown-language-compact"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '0.85rem',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 0,
              fontWeight: '500'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={flagPath(lang)} 
                alt="flag" 
                style={{
                  width: '18px',
                  height: '13px',
                  objectFit: 'cover',
                  marginRight: '8px',
                  borderRadius: '2px'
                }} 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span>{languageNames[lang]}</span>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{
            minWidth: '100%',
            background: '#2d3748',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            marginTop: '4px',
            padding: '4px'
          }}>
            {['fr', 'ar'].map((langCode) => (
              <Dropdown.Item 
                key={langCode} 
                onClick={() => handleLanguageChange(langCode)}
                style={{ 
                  fontSize: '0.85rem',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  color: langCode === lang ? '#667eea' : 'rgba(255,255,255,0.9)',
                  background: langCode === lang ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                  border: 'none',
                  margin: '2px 0',
                  borderRadius: '4px'
                }}
              >
                <img 
                  src={flagPath(langCode)} 
                  alt={`${langCode} flag`} 
                  style={{
                    width: '18px',
                    height: '13px',
                    objectFit: 'cover',
                    marginRight: '10px',
                    borderRadius: '2px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span style={{ 
                  flex: 1,
                  fontWeight: langCode === lang ? '600' : '400'
                }}>
                  {languageNames[langCode]}
                </span>
                {langCode === lang && (
                  <FaCheck size={12} style={{ 
                    color: '#667eea', 
                    marginLeft: '8px'
                  }} />
                )}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  // 🔥 ELIMINADA COMPLETAMENTE LA VERSIÓN MÓVIL - SOLO RETORNA NULL
  return null;
}

export default LanguageSelectorandroid;