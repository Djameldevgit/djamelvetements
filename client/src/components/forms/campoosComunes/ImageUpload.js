import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ImageUpload = ({ images, handleChangeImages, deleteImages, theme }) => {
    const { t, i18n } = useTranslation(["categories"]);

    const imageShow = (src, index) => (
        <div className="position-relative">
            <img
                src={src}
                alt={t('preview')}
                style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                }}
            />
        </div>
    );

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {t('images', 'Imágenes del Producto')}
                </Form.Label>
                
                {/* 📝 PREVIEW SIMPLE */}
                {images.length > 0 && (
                    <div className="mb-3">
                        <div className="d-flex flex-wrap gap-2">
                            {images.map((img, index) => (
                                <div key={index} className="position-relative" style={{ width: '80px' }}>
                                    {img.camera
                                        ? imageShow(img.camera, index)
                                        : img.url
                                            ? imageShow(img.url, index)
                                            : imageShow(URL.createObjectURL(img), index)
                                    }
                                    <button
                                        type="button"
                                        className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle"
                                        onClick={() => deleteImages(index)}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            fontSize: '12px',
                                            transform: 'translate(30%, -30%)'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-muted small mt-2">
                            {images.length} {t('images_selected', 'imágenes seleccionadas')}
                        </div>
                    </div>
                )}
                
                {/* 📝 UPLOAD SIMPLE */}
                <div className="border p-3 text-center rounded">
                    <label
                        htmlFor="image-upload"
                        style={{
                            display: 'inline-block',
                            cursor: 'pointer',
                            color: '#0d6efd',
                        }}
                    >
                        {t('upload_images', 'Subir imágenes')}
                    </label>
                    <Form.Control
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChangeImages}
                        style={{ display: 'none' }}
                    />
                    <div className="text-muted small mt-1">
                        {t('upload_info', 'Selecciona imágenes del producto')}
                    </div>
                </div>
            </Form.Group>
        </Card>
    );
};

export default ImageUpload;