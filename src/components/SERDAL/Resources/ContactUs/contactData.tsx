import contact from '../ContactUs/Contact us.svg'

export interface ContactData {
    address: React.ReactNode;
    contact1: string;
    contact2: string;
    email: string;
    fb: string;
    img: string;
}

const contactUsData: ContactData = {
    address: (
        <>
          Room 14 & 15, ICOPED Building <br />
          Fabian A. Tiongson Avenue <br />
          University of the Philippines Los Baños <br />
          College, Laguna, 4031 Philippines
        </>
      ),
    contact1: "+63 961-057-5841",
    contact2: "+63 927-963-4704",
    email:"serdal.uplb@up.edu.ph",
    fb: "https://www.facebook.com/UPLB.SERDAL",
    img: contact,
}

export default contactUsData;