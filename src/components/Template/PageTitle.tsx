import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import SERDALLogo from '../SERDAL/Resources/logo.png';

interface PageTitleProps {
  title: string;
  keywords?:string;
  description?: string;
  imageUrl?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, keywords,imageUrl  }) => {
  const location = useLocation();
  const domain  = import.meta.env.VITE_SERDAL_DOMAIN;

  const defaultKeywords = "SERDAL, UPLB, socio-economic research, data analytics, capacity building";
  const combinedKeywords  = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords;

  const MAX_CHAR_LENGTH = 255;
  const allKeywords = combinedKeywords.length > MAX_CHAR_LENGTH ? combinedKeywords.substring(0, MAX_CHAR_LENGTH).trim() : combinedKeywords;
  const cutDescription = description && description.length > MAX_CHAR_LENGTH ? description.substring(0, MAX_CHAR_LENGTH).trim() : description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={cutDescription || "Default description for SERDAL"} />
      <meta name="keywords" content={allKeywords} />

      <meta property="og:description" content={"The UPLB Socio-Economics Research and Data Analytics Laboratory empowers individuals and organizations through capacity building, research, and data analytics — helping them make smarter decisions and drive meaningful change in the field of socio-economics."} />
      <meta property="og:url" content={`${domain}${location.pathname}`} />
      <meta property="og:image" content={imageUrl || SERDALLogo} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default PageTitle;
