import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: "Sikil.id",
    description: "We sell the best products for cheap price",
    keywords: "Shoes, apparel",
};

export default Meta;
