import { Helmet } from 'react-helmet-async';

export default function useHelmet({
    title,
    suffix = ' • FastPay',  
    description,
    noSuffix = false,        
    extra = null,
}) {
    const fullTitle = title ? (noSuffix ? title : `${title}${suffix}`) : undefined;

    const HelmetTags = () => (
        <Helmet>
            {fullTitle && <title>{fullTitle}</title>}
            {description && <meta name="description" content={description} />}
            {/* Optional Open Graph/Twitter */}
            {fullTitle && <meta property="og:title" content={fullTitle} />}
            {description && <meta property="og:description" content={description} />}
            {extra}
        </Helmet>
    );

    return HelmetTags;
}
