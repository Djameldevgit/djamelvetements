import React, { useMemo } from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Marca = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('marca')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        marca: postData?.marca || "",
        ...postData
    }

    // Función segura para obtener traducciones
    const getTranslation = (key, fallback) => {
        try {
            return t(key, fallback)
        } catch (error) {
            return fallback
        }
    }

    // 🎯 DEFINICIÓN COMPLETA DE MARCAS POR CATEGORÍA Y SUBCATEGORÍA
    const getFilteredBrands = useMemo(() => {
        if (!postData.subCategory) return []

        const subCategory = postData.subCategory.toLowerCase();
        const category = postData.category;
        let allBrands = [];

        // 👔 ROPA HOMBRE
        if (category === 'vetements_homme') {
            allBrands = [
                "Nike", "Adidas", "Puma", "Under Armour", "Reebok",
                "Levi's", "Tommy Hilfiger", "Calvin Klein", "Ralph Lauren", 
                "Lacoste", "H&M", "Zara", "Uniqlo", "Diesel", "Hugo Boss"
            ];
        }

        // 👗 ROPA MUJER
        else if (category === 'vetements_femme') {
            allBrands = [
                "Zara", "H&M", "Mango", "Bershka", "Pull&Bear",
                "Forever 21", "Calvin Klein", "Tommy Hilfiger", "Ralph Lauren",
                "Michael Kors", "Coach", "Kate Spade", "Victoria's Secret"
            ];
        }

        // 👞 CALZADO HOMBRE
        else if (category === 'chaussures_homme') {
            allBrands = [
                "Nike", "Adidas", "Puma", "Under Armour", "Reebok",
                "Converse", "Vans", "New Balance", "Skechers", "Clarks",
                "Dr. Martens", "Timberland", "Geox", "ECCO"
            ];
        }

        // 👠 CALZADO MUJER
        else if (category === 'chaussures_femme') {
            allBrands = [
                "Nike", "Adidas", "Puma", "Converse", "Vans",
                "Steve Madden", "Nine West", "Sam Edelman", "Clarks",
                "Naturalizer", "Skechers", "ECCO", "Geox"
            ];
        }

        // 👶 BEBÉS
        else if (category === 'bebe') {
            allBrands = [
                "Carter's", "Gerber", "OshKosh", "The Children's Place",
                "Gap Kids", "Old Navy", "H&M Kids", "Zara Kids"
            ];
        }

        // 👦 NIÑOS
        else if (category === 'garcons') {
            allBrands = [
                "Nike Kids", "Adidas Kids", "Puma Kids", "Levi's Kids",
                "Gap Kids", "Old Navy", "The Children's Place", "OshKosh"
            ];
        }

        // 👧 NIÑAS
        else if (category === 'filles') {
            allBrands = [
                "Nike Kids", "Adidas Kids", "Puma Kids", "Gap Kids",
                "Old Navy", "The Children's Place", "Carter's", "OshKosh"
            ];
        }

        // ⌚ RELOJES
        else if (category === 'montres') {
            allBrands = [
                "Rolex", "Omega", "Tag Heuer", "Casio", "Seiko",
                "Citizen", "Fossil", "Michael Kors", "Daniel Wellington",
                "Swatch", "Timex", "Bulova", "Tissot", "Longines"
            ];
        }

        // 👓 GAFAS
        else if (category === 'lunettes') {
            allBrands = [
                "Ray-Ban", "Oakley", "Prada", "Gucci", "Dior",
                "Chanel", "Versace", "Armani", "Tom Ford", "Burberry",
                "Persol", "Maui Jim", "Carrera", "Vogue"
            ];
        }

        // 💎 JOYERÍA
        else if (category === 'bijoux') {
            allBrands = [
                "Tiffany & Co.", "Cartier", "Pandora", "Swarovski",
                "Bulgaria", "Van Cleef & Arpels", "Harry Winston",
                "David Yurman", "Mikimoto", "Chopard", "Bvlgari"
            ];
        }

        // 👜 BOLSOS Y MALETAS
        else if (category === 'sacs_valises') {
            allBrands = [
                "Louis Vuitton", "Gucci", "Chanel", "Prada", "Hermès",
                "Dior", "Fendi", "Burberry", "Michael Kors", "Coach",
                "Kate Spade", "Longchamp", "Samsonite", "Tumi"
            ];
        }

        // 💼 ROPA PROFESIONAL
        else if (category === 'tenues_professionnelles') {
            allBrands = [
                "Dickies", "Carhartt", "Wrangler", "Lee", "Caterpillar",
                "Red Kap", "Cherokee", "Landau", "Careismatic"
            ];
        }

        // ⭐ DEFAULT - Marcas generales
        else {
            allBrands = [
                "Nike", "Adidas", "Zara", "H&M", "Puma", "Levi's", 
                "Tommy Hilfiger", "Calvin Klein", "Ralph Lauren", "Lacoste"
            ];
        }

        return allBrands;
    }, [postData.category, postData.subCategory]);

    if (!postData.subCategory) {
        return (
            <Card className="p-3 mb-3">
                <div className="text-center py-4 text-muted">
                    <p className="mb-0">
                        {isRTL ? 'اختر فئة فرعية لرؤية العلامات التجارية' : 'Selecciona una subcategoría para ver las marcas'}
                    </p>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('brand', 'Marca del Producto')}
                </Form.Label>
                
                {/* 📝 SELECT SIMPLE */}
                <Form.Select
                    name="marca"
                    value={safePostData.marca}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    <option value="">{getTranslation('select_brand', 'Selecciona una marca')}</option>
                    <option value="otra">{getTranslation('other_brand', 'Otra marca...')}</option>
                    {getFilteredBrands.map(marca => (
                        <option key={marca} value={marca}>
                            {marca}
                        </option>
                    ))}
                </Form.Select>
                
                {/* 🔢 INPUT PARA OTRA MARCA */}
                {safePostData.marca === "otra" && (
                    <Form.Control
                        type="text"
                        name="marca"
                        placeholder={getTranslation('write_brand', 'Escribe el nombre de la marca...')}
                        onChange={handleChangeInput}
                        className="mt-2"
                        style={{
                            textAlign: isRTL ? 'right' : 'left',
                            direction: isRTL ? 'rtl' : 'ltr'
                        }}
                    />
                )}
            </Form.Group>
        </Card>
    )
}

export default Marca