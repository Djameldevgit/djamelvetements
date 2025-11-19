import React from 'react';
import DescriptionPost from './home/post_card/DescriptionPost';
import CardBodyCarousel from './home/post_card/CardBodyCarousel';

const DetailPostCard = ({ post }) => {
    return (
        <div>
            <CardBodyCarousel post={post} />
            <DescriptionPost post={post} />
        </div>
    );
};

export default DetailPostCard;