import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HotelHajjOmra = ({ postData, handleChangeInput }) => {
    const { t, i18n } = useTranslation(["categories"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    // Hoteles en La Meca organizados por zona
    const hotelesMeca = [
        {
            grupo: t('primeraLineaMeca', 'Primera Línea - Vista Directa'),
            hoteles: [
                { value: 'abraj_al_bait', label: t('abrajAlBait', '🏨 Abraj Al Bait (Makkah Clock Royal Tower)') },
                { value: 'fairmont_makkah', label: t('fairmontMakkah', '🏨 Fairmont Makkah Clock Royal Tower') },
                { value: 'swissotel_makkah', label: t('swissotelMakkah', '🏨 Swissotel Makkah') },
                { value: 'movenpick_hotel_clock', label: t('movenpickClock', '🏨 Mövenpick Hotel & Residence Clock Tower') },
                { value: 'rafal_royal', label: t('rafalRoyal', '🏨 Rafal Royal Hotel') }
            ]
        },
        {
            grupo: t('zonaCentralMeca', 'Zona Central - A poca distancia'),
            hoteles: [
                { value: 'intercontinental_makkah', label: t('intercontinentalMakkah', '🏨 InterContinental Makkah') },
                { value: 'conrad_makkah', label: t('conradMakkah', '🏨 Conrad Makkah') },
                { value: 'hyatt_regency_makkah', label: t('hyattRegencyMakkah', '🏨 Hyatt Regency Makkah') },
                { value: 'hilton_makkah', label: t('hiltonMakkah', '🏨 Hilton Makkah Convention') },
                { value: 'marriott_makkah', label: t('marriottMakkah', '🏨 Makkah Marriott Hotel') },
                { value: 'pullman_zamzam', label: t('pullmanZamzam', '🏨 Pullman ZamZam Makkah') }
            ]
        },
        {
            grupo: t('zonaAjyadMeca', 'Zona Ajyad - Cercana'),
            hoteles: [
                { value: 'shaza_makkah', label: t('shazaMakkah', '🏨 Shaza Makkah') },
                { value: 'dar_al_tawhid', label: t('darAlTawhid', '🏨 Dar Al Tawhid InterContinental') },
                { value: 'makkah_chambers', label: t('makkahChambers', '🏨 Makkah Chambers Hotel') },
                { value: 'ibis_makkah', label: t('ibisMakkah', '🏨 Ibis Makkah Hotel') }
            ]
        },
        {
            grupo: t('hotelesEconomicosMeca', 'Hoteles Económicos'),
            hoteles: [
                { value: 'holiday_inn_makkah', label: t('holidayInnMakkah', '🏨 Holiday Inn Makkah') },
                { value: 'al_bait_makkah', label: t('alBaitMakkah', '🏨 Al Bait Hotel') },
                { value: 'makkah_hotel', label: t('makkahHotel', '🏨 Makkah Hotel') },
                { value: 'safwah_royal', label: t('safwahRoyal', '🏨 Safwah Royal Hotel') }
            ]
        }
    ];

    // Hoteles en Medina organizados por zona
    const hotelesMedina = [
        {
            grupo: t('primeraLineaMedina', 'Primera Línea - Vista Directa'),
            hoteles: [
                { value: 'anwar_al_madinah', label: t('anwarAlMadinah', '🏨 Anwar Al Madinah Mövenpick') },
                { value: 'darf_taqwa', label: t('darAlTaqwa', '🏨 Dar Al Taqwa Hotel') },
                { value: 'al_majeedi_royal', label: t('alMajeediRoyal', '🏨 Al Majeedi Royal Hotel') },
                { value: 'shaza_al_madinah', label: t('shazaAlMadinah', '🏨 Shaza Al Madinah') }
            ]
        },
        {
            grupo: t('zonaCentralMedina', 'Zona Central - A poca distancia'),
            hoteles: [
                { value: 'intercontinental_medina', label: t('intercontinentalMedina', '🏨 InterContinental Medina') },
                { value: 'pullman_medina', label: t('pullmanMedina', '🏨 Pullman Medina') },
                { value: 'radisson_blu_medina', label: t('radissonBluMedina', '🏨 Radisson Blu Medina') },
                { value: 'hilton_medina', label: t('hiltonMedina', '🏨 Hilton Medina') },
                { value: 'hyatt_medina', label: t('hyattMedina', '🏨 Hyatt Regency Medina') }
            ]
        },
        {
            grupo: t('zonaOesteMedina', 'Zona Oeste - Cercana'),
            hoteles: [
                { value: 'marriott_medina', label: t('marriottMedina', '🏨 Medina Marriott Hotel') },
                { value: 'sofara_medina', label: t('sofaraAlHijrah', '🏨 Sofara Al Hijrah Hotel') },
                { value: 'al_masa', label: t('alMasaHotel', '🏨 Al Masa Hotel') },
                { value: 'diyar_medina', label: t('diyarAlMedina', '🏨 Diyar Al Medina Hotel') }
            ]
        },
        {
            grupo: t('hotelesEconomicosMedina', 'Hoteles Económicos'),
            hoteles: [
                { value: 'holiday_inn_medina', label: t('holidayInnMedina', '🏨 Holiday Inn Medina') },
                { value: 'al_ansar_royal', label: t('alAnsarRoyal', '🏨 Al Ansar Royal Hotel') },
                { value: 'qasr_al_ain', label: t('qasrAlAin', '🏨 Qasr Al Ain Hotel') },
                { value: 'al_haram_hotel', label: t('alHaramHotelMedina', '🏨 Al Haram Hotel Medina') }
            ]
        }
    ];

    // Combinar todos los hoteles en una sola lista
    const todosLosHoteles = [
        {
            grupo: t('hotelesLaMeca', '🕋 Hoteles en La Meca'),
            hoteles: hotelesMeca.flatMap(grupo => grupo.hoteles)
        },
        {
            grupo: t('hotelesMedina', '🕌 Hoteles en Medina'), 
            hoteles: hotelesMedina.flatMap(grupo => grupo.hoteles)
        }
    ];

    return (
        <Card className="mb-4">
            <Card.Header style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                <h5 className="mb-0">
                    🏨 {t('hotelesHajjOmra', 'Hoteles para Hajj & Omra')}
                </h5>
            </Card.Header>
            <Card.Body>
                <Row style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                    <Col xs={12}>
                        <Form.Group className="h-100">
                            <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
                                🏨 {t('seleccionarHotel', 'Seleccionar Hotel')} *
                            </Form.Label>
                            <Form.Select
                                name="nombreHotel"
                                value={postData.nombreHotel || ''}
                                onChange={handleChangeInput}
                                required
                                className={`w-100 ${isRTL ? 'text-end' : ''}`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                size="lg"
                            >
                                <option value="">{t('selectHotel', 'Seleccione un hotel en La Meca o Medina')}</option>
                                {todosLosHoteles.map((ciudad, index) => (
                                    <optgroup key={index} label={ciudad.grupo}>
                                        {ciudad.hoteles.map((hotel, hotelIndex) => (
                                            <option key={hotelIndex} value={hotel.value}>
                                                {hotel.label}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default HotelHajjOmra;