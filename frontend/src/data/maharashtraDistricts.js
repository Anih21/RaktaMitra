// Approximate relative positions (0-100 viewBox) arranged to mirror
// Maharashtra's real geographic layout (north at top, Konkan coast on the
// west/left, Vidarbha extending east). This is a STYLIZED node-map for
// interaction purposes, not a survey-accurate cartographic boundary file.

export const DIVISIONS = {
  konkan: { en: 'Konkan', hi: 'कोंकण', mr: 'कोकण' },
  pune: { en: 'Pune Division', hi: 'पुणे विभाग', mr: 'पुणे विभाग' },
  nashik: { en: 'Nashik Division', hi: 'नाशिक विभाग', mr: 'नाशिक विभाग' },
  aurangabad: { en: 'Marathwada', hi: 'मराठवाडा', mr: 'मराठवाडा' },
  amravati: { en: 'Amravati Division', hi: 'अमरावती विभाग', mr: 'अमरावती विभाग' },
  nagpur: { en: 'Nagpur Division (Vidarbha)', hi: 'नागपूर विभाग (विदर्भ)', mr: 'नागपूर विभाग (विदर्भ)' }
};

export const DISTRICTS = [
  // Nashik division
  { id: 'nandurbar', x: 18, y: 8, division: 'nashik', name: { en: 'Nandurbar', hi: 'नंदुरबार', mr: 'नंदुरबार' } },
  { id: 'dhule', x: 27, y: 11, division: 'nashik', name: { en: 'Dhule', hi: 'धुळे', mr: 'धुळे' } },
  { id: 'jalgaon', x: 38, y: 10, division: 'nashik', name: { en: 'Jalgaon', hi: 'जळगाव', mr: 'जळगाव' } },
  { id: 'nashik', x: 24, y: 22, division: 'nashik', name: { en: 'Nashik', hi: 'नाशिक', mr: 'नाशिक' } },

  // Konkan division
  { id: 'palghar', x: 10, y: 22, division: 'konkan', name: { en: 'Palghar', hi: 'पालघर', mr: 'पालघर' } },
  { id: 'thane', x: 12, y: 30, division: 'konkan', name: { en: 'Thane', hi: 'ठाणे', mr: 'ठाणे' } },
  { id: 'mumbai_suburban', x: 8, y: 35, division: 'konkan', name: { en: 'Mumbai Suburban', hi: 'मुंबई उपनगर', mr: 'मुंबई उपनगर' } },
  { id: 'mumbai_city', x: 6, y: 39, division: 'konkan', name: { en: 'Mumbai City', hi: 'मुंबई शहर', mr: 'मुंबई शहर' } },
  { id: 'raigad', x: 14, y: 44, division: 'konkan', name: { en: 'Raigad', hi: 'रायगड', mr: 'रायगड' } },
  { id: 'ratnagiri', x: 13, y: 58, division: 'konkan', name: { en: 'Ratnagiri', hi: 'रत्नागिरी', mr: 'रत्नागिरी' } },
  { id: 'sindhudurg', x: 14, y: 70, division: 'konkan', name: { en: 'Sindhudurg', hi: 'सिंधुदुर्ग', mr: 'सिंधुदुर्ग' } },

  // Pune division
  { id: 'ahmednagar', x: 36, y: 30, division: 'pune', name: { en: 'Ahmednagar', hi: 'अहमदनगर', mr: 'अहमदनगर' } },
  { id: 'pune', x: 28, y: 40, division: 'pune', name: { en: 'Pune', hi: 'पुणे', mr: 'पुणे' } },
  { id: 'solapur', x: 44, y: 46, division: 'pune', name: { en: 'Solapur', hi: 'सोलापूर', mr: 'सोलापूर' } },
  { id: 'satara', x: 27, y: 53, division: 'pune', name: { en: 'Satara', hi: 'सातारा', mr: 'सातारा' } },
  { id: 'sangli', x: 29, y: 62, division: 'pune', name: { en: 'Sangli', hi: 'सांगली', mr: 'सांगली' } },
  { id: 'kolhapur', x: 24, y: 70, division: 'pune', name: { en: 'Kolhapur', hi: 'कोल्हापूर', mr: 'कोल्हापूर' } },

  // Marathwada (Aurangabad division)
  { id: 'aurangabad', x: 46, y: 30, division: 'aurangabad', name: { en: 'Chhatrapati Sambhajinagar (Aurangabad)', hi: 'छत्रपती संभाजीनगर (औरंगाबाद)', mr: 'छत्रपती संभाजीनगर (औरंगाबाद)' } },
  { id: 'jalna', x: 53, y: 30, division: 'aurangabad', name: { en: 'Jalna', hi: 'जालना', mr: 'जालना' } },
  { id: 'parbhani', x: 60, y: 33, division: 'aurangabad', name: { en: 'Parbhani', hi: 'परभणी', mr: 'परभणी' } },
  { id: 'hingoli', x: 64, y: 28, division: 'aurangabad', name: { en: 'Hingoli', hi: 'हिंगोली', mr: 'हिंगोली' } },
  { id: 'beed', x: 50, y: 40, division: 'aurangabad', name: { en: 'Beed', hi: 'बीड', mr: 'बीड' } },
  { id: 'latur', x: 58, y: 47, division: 'aurangabad', name: { en: 'Latur', hi: 'लातूर', mr: 'लातूर' } },
  { id: 'dharashiv', x: 52, y: 50, division: 'aurangabad', name: { en: 'Dharashiv (Osmanabad)', hi: 'धाराशिव (उस्मानाबाद)', mr: 'धाराशिव (उस्मानाबाद)' } },
  { id: 'nanded', x: 67, y: 38, division: 'aurangabad', name: { en: 'Nanded', hi: 'नांदेड', mr: 'नांदेड' } },

  // Amravati division
  { id: 'buldhana', x: 48, y: 18, division: 'amravati', name: { en: 'Buldhana', hi: 'बुलढाणा', mr: 'बुलढाणा' } },
  { id: 'akola', x: 56, y: 18, division: 'amravati', name: { en: 'Akola', hi: 'अकोला', mr: 'अकोला' } },
  { id: 'washim', x: 62, y: 22, division: 'amravati', name: { en: 'Washim', hi: 'वाशीम', mr: 'वाशीम' } },
  { id: 'amravati', x: 60, y: 12, division: 'amravati', name: { en: 'Amravati', hi: 'अमरावती', mr: 'अमरावती' } },
  { id: 'yavatmal', x: 68, y: 22, division: 'amravati', name: { en: 'Yavatmal', hi: 'यवतमाळ', mr: 'यवतमाळ' } },

  // Nagpur division (Vidarbha)
  { id: 'wardha', x: 72, y: 16, division: 'nagpur', name: { en: 'Wardha', hi: 'वर्धा', mr: 'वर्धा' } },
  { id: 'nagpur', x: 80, y: 12, division: 'nagpur', name: { en: 'Nagpur', hi: 'नागपूर', mr: 'नागपूर' } },
  { id: 'bhandara', x: 88, y: 10, division: 'nagpur', name: { en: 'Bhandara', hi: 'भंडारा', mr: 'भंडारा' } },
  { id: 'gondia', x: 94, y: 8, division: 'nagpur', name: { en: 'Gondia', hi: 'गोंदिया', mr: 'गोंदिया' } },
  { id: 'chandrapur', x: 82, y: 26, division: 'nagpur', name: { en: 'Chandrapur', hi: 'चंद्रपूर', mr: 'चंद्रपूर' } },
  { id: 'gadchiroli', x: 92, y: 22, division: 'nagpur', name: { en: 'Gadchiroli', hi: 'गडचिरोली', mr: 'गडचिरोली' } }
];

export const getDistrictName = (districtId, lang) => {
  const d = DISTRICTS.find((d) => d.id === districtId);
  if (!d) return '';
  return d.name[lang] || d.name.en;
};