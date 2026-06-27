// Taluka -> Village data, trilingual.
// Fully digitized for a set of major districts; other districts fall back
// to a manual "type your taluka/village" input in the UI (see
// MaharashtraLocationPicker.jsx) so the feature still works end-to-end
// even before every district's data is added here.

export const LOCATION_DATA = {
  nashik: {
    talukas: [
      {
        id: 'nashik_taluka',
        name: { en: 'Nashik', hi: 'नाशिक', mr: 'नाशिक' },
        villages: [
          { en: 'Panchavati', hi: 'पंचवटी', mr: 'पंचवटी' },
          { en: 'Satpur', hi: 'सातपूर', mr: 'सातपूर' },
          { en: 'Indira Nagar', hi: 'इंदिरा नगर', mr: 'इंदिरा नगर' }
        ]
      },
      {
        id: 'igatpuri',
        name: { en: 'Igatpuri', hi: 'इगतपुरी', mr: 'इगतपुरी' },
        villages: [
          { en: 'Ghoti', hi: 'घोटी', mr: 'घोटी' },
          { en: 'Talegaon', hi: 'तळेगाव', mr: 'तळेगाव' }
        ]
      },
      {
        id: 'sinnar',
        name: { en: 'Sinnar', hi: 'सिन्नर', mr: 'सिन्नर' },
        villages: [
          { en: 'Sinnar Town', hi: 'सिन्नर शहर', mr: 'सिन्नर शहर' },
          { en: 'Nayagaon', hi: 'नायगाव', mr: 'नायगाव' }
        ]
      }
    ]
  },

  pune: {
    talukas: [
      {
        id: 'haveli',
        name: { en: 'Haveli', hi: 'हवेली', mr: 'हवेली' },
        villages: [
          { en: 'Hadapsar', hi: 'हडपसर', mr: 'हडपसर' },
          { en: 'Wagholi', hi: 'वागोली', mr: 'वागोली' },
          { en: 'Kharadi', hi: 'खराडी', mr: 'खराडी' }
        ]
      },
      {
        id: 'mulshi',
        name: { en: 'Mulshi', hi: 'मुळशी', mr: 'मुळशी' },
        villages: [
          { en: 'Pirangut', hi: 'पिरंगुट', mr: 'पिरंगुट' },
          { en: 'Hinjawadi', hi: 'हिंजवडी', mr: 'हिंजवडी' }
        ]
      },
      {
        id: 'baramati',
        name: { en: 'Baramati', hi: 'बारामती', mr: 'बारामती' },
        villages: [
          { en: 'Baramati Town', hi: 'बारामती शहर', mr: 'बारामती शहर' },
          { en: 'Malegaon', hi: 'मळेगाव', mr: 'मळेगाव' }
        ]
      }
    ]
  },

  mumbai_suburban: {
    talukas: [
      {
        id: 'andheri',
        name: { en: 'Andheri', hi: 'अंधेरी', mr: 'अंधेरी' },
        villages: [
          { en: 'Andheri East', hi: 'अंधेरी पूर्व', mr: 'अंधेरी पूर्व' },
          { en: 'Andheri West', hi: 'अंधेरी पश्चिम', mr: 'अंधेरी पश्चिम' }
        ]
      },
      {
        id: 'borivali',
        name: { en: 'Borivali', hi: 'बोरीवली', mr: 'बोरीवली' },
        villages: [
          { en: 'Borivali East', hi: 'बोरीवली पूर्व', mr: 'बोरीवली पूर्व' },
          { en: 'Borivali West', hi: 'बोरीवली पश्चिम', mr: 'बोरीवली पश्चिम' }
        ]
      },
      {
        id: 'kurla',
        name: { en: 'Kurla', hi: 'कुर्ला', mr: 'कुर्ला' },
        villages: [
          { en: 'Kurla West', hi: 'कुर्ला पश्चिम', mr: 'कुर्ला पश्चिम' },
          { en: 'Chunabhatti', hi: 'चुनाभट्टी', mr: 'चुनाभट्टी' }
        ]
      }
    ]
  },

  thane: {
    talukas: [
      {
        id: 'thane_taluka',
        name: { en: 'Thane', hi: 'ठाणे', mr: 'ठाणे' },
        villages: [
          { en: 'Ghodbunder Road', hi: 'घोडबंदर रोड', mr: 'घोडबंदर रोड' },
          { en: 'Kalwa', hi: 'कळवा', mr: 'कळवा' }
        ]
      },
      {
        id: 'kalyan',
        name: { en: 'Kalyan', hi: 'कल्याण', mr: 'कल्याण' },
        villages: [
          { en: 'Kalyan West', hi: 'कल्याण पश्चिम', mr: 'कल्याण पश्चिम' },
          { en: 'Dombivli', hi: 'डोंबिवली', mr: 'डोंबिवली' }
        ]
      }
    ]
  },

  kolhapur: {
    talukas: [
      {
        id: 'karveer',
        name: { en: 'Karveer', hi: 'करवीर', mr: 'करवीर' },
        villages: [
          { en: 'Kolhapur City', hi: 'कोल्हापूर शहर', mr: 'कोल्हापूर शहर' },
          { en: 'Uchgaon', hi: 'उचगाव', mr: 'उचगाव' }
        ]
      },
      {
        id: 'panhala',
        name: { en: 'Panhala', hi: 'पन्हाळा', mr: 'पन्हाळा' },
        villages: [
          { en: 'Panhala Fort Town', hi: 'पन्हाळा किल्ला गाव', mr: 'पन्हाळा किल्ला गाव' }
        ]
      }
    ]
  },

  solapur: {
    talukas: [
      {
        id: 'north_solapur',
        name: { en: 'North Solapur', hi: 'उत्तर सोलापूर', mr: 'उत्तर सोलापूर' },
        villages: [
          { en: 'Solapur City', hi: 'सोलापूर शहर', mr: 'सोलापूर शहर' }
        ]
      },
      {
        id: 'pandharpur',
        name: { en: 'Pandharpur', hi: 'पंढरपूर', mr: 'पंढरपूर' },
        villages: [
          { en: 'Pandharpur Town', hi: 'पंढरपूर शहर', mr: 'पंढरपूर शहर' }
        ]
      }
    ]
  },

  aurangabad: {
    talukas: [
      {
        id: 'aurangabad_taluka',
        name: { en: 'Chhatrapati Sambhajinagar', hi: 'छत्रपती संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },
        villages: [
          { en: 'Waluj', hi: 'वाळूज', mr: 'वाळूज' },
          { en: 'Paithan Road', hi: 'पैठण रोड', mr: 'पैठण रोड' }
        ]
      },
      {
        id: 'paithan',
        name: { en: 'Paithan', hi: 'पैठण', mr: 'पैठण' },
        villages: [
          { en: 'Paithan Town', hi: 'पैठण शहर', mr: 'पैठण शहर' }
        ]
      }
    ]
  },

  nagpur: {
    talukas: [
      {
        id: 'nagpur_urban',
        name: { en: 'Nagpur (Urban)', hi: 'नागपूर (शहरी)', mr: 'नागपूर (शहरी)' },
        villages: [
          { en: 'Sitabuldi', hi: 'सीताबर्डी', mr: 'सीताबर्डी' },
          { en: 'Dharampeth', hi: 'धरमपेठ', mr: 'धरमपेठ' }
        ]
      },
      {
        id: 'kamptee',
        name: { en: 'Kamptee', hi: 'कामठी', mr: 'कामठी' },
        villages: [
          { en: 'Kamptee Town', hi: 'कामठी शहर', mr: 'कामठी शहर' }
        ]
      }
    ]
  }
};

export const hasDigitizedData = (districtId) =>
  Boolean(LOCATION_DATA[districtId]);

export const getTalukas = (districtId) =>
  LOCATION_DATA[districtId]?.talukas || [];

export const getVillages = (districtId, talukaId) => {
  const taluka = getTalukas(districtId).find((t) => t.id === talukaId);
  return taluka?.villages || [];
};