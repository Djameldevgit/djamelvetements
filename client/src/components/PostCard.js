import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CardBodyCarousel from './home/post_card/CardBodyCarousel';
import CardBodyTitle from './home/post_card/CardBodyTitle';
import CardFooter from './home/post_card/CardFooter';

const PostCard = ({ post }) => {
    return (
       
                <Card 
                    className="shadow-hover border-0"
                    style={{ 
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                    }}
                >
                    {/* Header con información del usuario */}
                 
                        <CardBodyTitle post={post} />
                    

                    {/* Contenido multimedia */}
                    <CardBodyCarousel post={post} />

                    {/* Acciones y comentarios */}
                 
                        <CardFooter post={post} />
                    
                </Card>
         
    );
};

export default React.memo(PostCard);