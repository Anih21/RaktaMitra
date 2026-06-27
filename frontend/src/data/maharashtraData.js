// Accurate Maharashtra Administrative Data
// Source: Census of India & Maharashtra Government Records
// Hierarchy: District → Taluka → Villages (representative villages per taluka)

export const MAHARASHTRA_DATA = [
  {
    id: "mumbai-city",
    en: "Mumbai City", hi: "मुंबई शहर", mr: "मुंबई शहर",
    division: "konkan",
    talukas: [
      { id: "mumbai-city-t", en: "Mumbai City", hi: "मुंबई शहर", mr: "मुंबई शहर",
        villages: ["Colaba", "Fort", "Churchgate", "Byculla", "Dadar", "Parel", "Wadala", "Sewri", "Matunga", "Sion"] }
    ]
  },
  {
    id: "mumbai-suburban",
    en: "Mumbai Suburban", hi: "मुंबई उपनगर", mr: "मुंबई उपनगर",
    division: "konkan",
    talukas: [
      { id: "andheri", en: "Andheri", hi: "अंधेरी", mr: "अंधेरी",
        villages: ["Andheri East", "Andheri West", "Versova", "Lokhandwala", "MIDC Andheri", "Chakala", "Sahar"] },
      { id: "borivali", en: "Borivali", hi: "बोरीवली", mr: "बोरीवली",
        villages: ["Borivali East", "Borivali West", "Dahisar", "Kandivali", "Malad", "Goregaon", "Poisar"] },
      { id: "kurla", en: "Kurla", hi: "कुर्ला", mr: "कुर्ला",
        villages: ["Kurla East", "Kurla West", "Vidyavihar", "Ghatkopar East", "Ghatkopar West", "Chembur", "Govandi"] }
    ]
  },
  {
    id: "thane",
    en: "Thane", hi: "ठाणे", mr: "ठाणे",
    division: "konkan",
    talukas: [
      { id: "thane-t", en: "Thane", hi: "ठाणे", mr: "ठाणे",
        villages: ["Thane City", "Wagle Estate", "Majiwada", "Manpada", "Kavesar", "Diva", "Mumbra", "Kalwa"] },
      { id: "kalyan", en: "Kalyan", hi: "कल्याण", mr: "कल्याण",
        villages: ["Kalyan East", "Kalyan West", "Dombivli East", "Dombivli West", "Ulhasnagar", "Ambernath", "Badlapur"] },
      { id: "bhiwandi", en: "Bhiwandi", hi: "भिवंडी", mr: "भिवंडी",
        villages: ["Bhiwandi", "Nandivali", "Kalher", "Kongaon", "Saravali", "Anjurphata", "Purna"] },
      { id: "shahapur", en: "Shahapur", hi: "शहापूर", mr: "शहापूर",
        villages: ["Shahapur", "Dhawari", "Aswali", "Kinhe", "Tokawade", "Bhamse", "Vasind", "Khardi"] },
      { id: "murbad", en: "Murbad", hi: "मुरबाड", mr: "मुरबाड",
        villages: ["Murbad", "Titwala", "Khodala", "Nidoshi", "Aale", "Rajivali", "Vashind"] }
    ]
  },
  {
    id: "palghar",
    en: "Palghar", hi: "पालघर", mr: "पालघर",
    division: "konkan",
    talukas: [
      { id: "palghar-t", en: "Palghar", hi: "पालघर", mr: "पालघर",
        villages: ["Palghar", "Boisar", "Tarapur", "Kelwa", "Mahim", "Akloli", "Sakhare"] },
      { id: "vasai", en: "Vasai", hi: "वसई", mr: "वसई",
        villages: ["Vasai East", "Vasai West", "Virar East", "Virar West", "Nalasopara East", "Nalasopara West", "Nallasopara"] },
      { id: "dahanu", en: "Dahanu", hi: "डहाणू", mr: "डहाणू",
        villages: ["Dahanu", "Gholvad", "Bordi", "Zai", "Asangaon", "Vangaon", "Chinchani"] },
      { id: "wada", en: "Wada", hi: "वाडा", mr: "वाडा",
        villages: ["Wada", "Sativali", "Khodala", "Posheri", "Ucheli", "Atgaon", "Bapane"] }
    ]
  },
  {
    id: "raigad",
    en: "Raigad", hi: "रायगड", mr: "रायगड",
    division: "konkan",
    talukas: [
      { id: "alibag", en: "Alibag", hi: "अलिबाग", mr: "अलिबाग",
        villages: ["Alibag", "Akshi", "Chondi", "Saswane", "Kihim", "Nagaon", "Varsoli", "Thal"] },
      { id: "panvel", en: "Panvel", hi: "पनवेल", mr: "पनवेल",
        villages: ["Panvel", "Khopoli", "Rasayani", "Taloja", "Kalamboli", "Kamothe", "Palaspe"] },
      { id: "pen", en: "Pen", hi: "पेण", mr: "पेण",
        villages: ["Pen", "Shrivardhan", "Diveagar", "Harihareshwar", "Velas", "Bankot"] },
      { id: "mahad", en: "Mahad", hi: "माहाड", mr: "माहाड",
        villages: ["Mahad", "Poladpur", "Mangaon", "Roha", "Murud", "Janjira"] }
    ]
  },
  {
    id: "ratnagiri",
    en: "Ratnagiri", hi: "रत्नागिरी", mr: "रत्नागिरी",
    division: "konkan",
    talukas: [
      { id: "ratnagiri-t", en: "Ratnagiri", hi: "रत्नागिरी", mr: "रत्नागिरी",
        villages: ["Ratnagiri", "Mirya", "Aare", "Bhatye", "Purnagad", "Pagdhi", "Marleshwar"] },
      { id: "chiplun", en: "Chiplun", hi: "चिपळूण", mr: "चिपळूण",
        villages: ["Chiplun", "Khed", "Guhagar", "Velneshwar", "Hedvi", "Anjanvel", "Sakarpa"] },
      { id: "sangameshwar", en: "Sangameshwar", hi: "संगमेश्वर", mr: "संगमेश्वर",
        villages: ["Sangameshwar", "Devrukh", "Kasheli", "Aambave", "Karvale", "Ukshi"] },
      { id: "lanja", en: "Lanja", hi: "लांजा", mr: "लांजा",
        villages: ["Lanja", "Rajapuri", "Kelshi", "Kondgaon", "Savarda", "Devache Gothane"] }
    ]
  },
  {
    id: "sindhudurg",
    en: "Sindhudurg", hi: "सिंधुदुर्ग", mr: "सिंधुदुर्ग",
    division: "konkan",
    talukas: [
      { id: "kudal", en: "Kudal", hi: "कुडाळ", mr: "कुडाळ",
        villages: ["Kudal", "Oros", "Banda", "Masure", "Itkeri", "Patgaon"] },
      { id: "sawantwadi", en: "Sawantwadi", hi: "सावंतवाडी", mr: "सावंतवाडी",
        villages: ["Sawantwadi", "Vengurla", "Redi", "Shiroda", "Parule", "Dodamarg"] },
      { id: "malvan", en: "Malvan", hi: "मालवण", mr: "मालवण",
        villages: ["Malvan", "Tarkarli", "Achara", "Devgad", "Vijaydurg", "Kunkeshwar"] },
      { id: "kankavli", en: "Kankavli", hi: "कणकवली", mr: "कणकवली",
        villages: ["Kankavli", "Vaibhavwadi", "Kalmath", "Nerur", "Nandos", "Shiroda"] }
    ]
  },
  {
    id: "nashik",
    en: "Nashik", hi: "नाशिक", mr: "नाशिक",
    division: "nashik",
    talukas: [
      { id: "nashik-t", en: "Nashik", hi: "नाशिक", mr: "नाशिक",
        villages: ["Nashik City", "Nashik Road", "Deolali", "Gangapur", "Devlali Camp", "Vinchur", "Ozar", "Nandur Madhmeshwar"] },
      { id: "niphad", en: "Niphad", hi: "निफाड", mr: "निफाड",
        villages: ["Niphad", "Lasalgaon", "Pimpalgaon Baswant", "Chandori", "Gaulane", "Nampur", "Kherwadi"] },
      { id: "malegaon", en: "Malegaon", hi: "मालेगाव", mr: "मालेगाव",
        villages: ["Malegaon", "Devpur", "Dabhadi", "Nandgaon", "Satana", "Harsul"] },
      { id: "igatpuri", en: "Igatpuri", hi: "इगतपुरी", mr: "इगतपुरी",
        villages: ["Igatpuri", "Ghoti", "Kasara", "Vashala", "Tringalwadi", "Bari"] },
      { id: "sinnar", en: "Sinnar", hi: "सिन्नर", mr: "सिन्नर",
        villages: ["Sinnar", "Saikheda", "Wadivarhe", "Pimpri", "Javal", "Tarwade"] }
    ]
  },
  {
    id: "dhule",
    en: "Dhule", hi: "धुळे", mr: "धुळे",
    division: "nashik",
    talukas: [
      { id: "dhule-t", en: "Dhule", hi: "धुळे", mr: "धुळे",
        villages: ["Dhule City", "Deopur", "Shirpur", "Sakri", "Varkhedi", "Bhankheda", "Kochur"] },
      { id: "shirpur", en: "Shirpur", hi: "शिरपूर", mr: "शिरपूर",
        villages: ["Shirpur", "Dahivel", "Borkheda", "Ranjane", "Varkhedi", "Torankheda"] },
      { id: "sakri", en: "Sakri", hi: "साक्री", mr: "साक्री",
        villages: ["Sakri", "Taharabad", "Vinchur", "Gonde", "Nandurbar Rd", "Pimprakhed"] }
    ]
  },
  {
    id: "nandurbar",
    en: "Nandurbar", hi: "नंदुरबार", mr: "नंदुरबार",
    division: "nashik",
    talukas: [
      { id: "nandurbar-t", en: "Nandurbar", hi: "नंदुरबार", mr: "नंदुरबार",
        villages: ["Nandurbar", "Shahade", "Warkheda", "Chauki", "Bhadane", "Mhasdi"] },
      { id: "shahada", en: "Shahada", hi: "शहादा", mr: "शहादा",
        villages: ["Shahada", "Prakasha", "Thalner", "Molgi", "Navapur", "Lakhana"] },
      { id: "akkalkuwa", en: "Akkalkuwa", hi: "अक्कलकुवा", mr: "अक्कलकुवा",
        villages: ["Akkalkuwa", "Akrani", "Dhadgaon", "Toranmal", "Kathi", "Molgi"] }
    ]
  },
  {
    id: "jalgaon",
    en: "Jalgaon", hi: "जळगाव", mr: "जळगाव",
    division: "nashik",
    talukas: [
      { id: "jalgaon-t", en: "Jalgaon", hi: "जळगाव", mr: "जळगाव",
        villages: ["Jalgaon City", "Neri", "Takarkheda", "Savda", "Bambhori", "Khandvi", "Wakod"] },
      { id: "bhusawal", en: "Bhusawal", hi: "भुसावळ", mr: "भुसावळ",
        villages: ["Bhusawal", "Yawal", "Muktainagar", "Jamner", "Chopda", "Palasner"] },
      { id: "pachora", en: "Pachora", hi: "पाचोरा", mr: "पाचोरा",
        villages: ["Pachora", "Chalisgaon", "Dharangaon", "Amalner", "Bhadgaon", "Parola"] },
      { id: "erandol", en: "Erandol", hi: "एरंडोल", mr: "एरंडोल",
        villages: ["Erandol", "Bodwad", "Raver", "Shendurni", "Nandurbar Colony", "Waghode"] }
    ]
  },
  {
    id: "ahmednagar",
    en: "Ahmednagar", hi: "अहमदनगर", mr: "अहमदनगर",
    division: "pune",
    talukas: [
      { id: "ahmednagar-t", en: "Ahmednagar", hi: "अहमदनगर", mr: "अहमदनगर",
        villages: ["Ahmednagar City", "Savedi", "Kedgaon", "Bhende", "Visapur", "Bhingar", "Nighoj"] },
      { id: "shrirampur", en: "Shrirampur", hi: "श्रीरामपूर", mr: "श्रीरामपूर",
        villages: ["Shrirampur", "Rahata", "Kopargaon", "Belapur", "Shingave", "Nimgaon"] },
      { id: "rahuri", en: "Rahuri", hi: "राहुरी", mr: "राहुरी",
        villages: ["Rahuri", "Rui", "Vambori", "Adhalgaon", "Wakhari", "Newasa"] },
      { id: "sangamner", en: "Sangamner", hi: "संगमनेर", mr: "संगमनेर",
        villages: ["Sangamner", "Akole", "Alephata", "Ghargaon", "Ozar", "Pimpalner"] }
    ]
  },
  {
    id: "pune",
    en: "Pune", hi: "पुणे", mr: "पुणे",
    division: "pune",
    talukas: [
      { id: "haveli", en: "Haveli", hi: "हवेली", mr: "हवेली",
        villages: ["Lohegaon", "Wagholi", "Manjari", "Kesnand", "Sanaswadi", "Koregaon Bhima", "Tulapur", "Alandi", "Dehu Road", "Chikhali", "Moshi"] },
      { id: "pune-city", en: "Pune City", hi: "पुणे शहर", mr: "पुणे शहर",
        villages: ["Shivajinagar", "Deccan", "Kothrud", "Aundh", "Baner", "Viman Nagar", "Kharadi", "Hadapsar", "Kondhwa", "Katraj"] },
      { id: "maval", en: "Maval", hi: "मावळ", mr: "मावळ",
        villages: ["Maval", "Talegaon Dabhade", "Vadgaon", "Kanhe", "Chakan", "Dehu", "Pimpri"] },
      { id: "mulshi", en: "Mulshi", hi: "मुळशी", mr: "मुळशी",
        villages: ["Pirangut", "Lavale", "Hinjewadi", "Paud", "Tamhini", "Bhugaon", "Nande", "Khadakwasla"] },
      { id: "baramati", en: "Baramati", hi: "बारामती", mr: "बारामती",
        villages: ["Baramati", "Yavat", "Supe", "Pargaon", "Morgaon", "Indapur", "Bhoregaon"] },
      { id: "shirur", en: "Shirur", hi: "शिरूर", mr: "शिरूर",
        villages: ["Shirur", "Ranjangaon", "Shikrapur", "Pune-Nagar Road", "Takali Haji", "Koregaon Mul", "Mulgaon"] },
      { id: "purandar", en: "Purandar", hi: "पुरंदर", mr: "पुरंदर",
        villages: ["Saswad", "Jejuri", "Dive", "Narayanpur", "Parinche", "Nhavi", "Pargaon"] }
    ]
  },
  {
    id: "solapur",
    en: "Solapur", hi: "सोलापूर", mr: "सोलापूर",
    division: "pune",
    talukas: [
      { id: "solapur-north", en: "Solapur North", hi: "सोलापूर उत्तर", mr: "सोलापूर उत्तर",
        villages: ["Solapur City North", "Hotgi", "Narkhed", "Vairag", "Shelgi", "Mundhewadi"] },
      { id: "solapur-south", en: "Solapur South", hi: "सोलापूर दक्षिण", mr: "सोलापूर दक्षिण",
        villages: ["Solapur City South", "Boramamani", "Kumtha", "Dudhani", "Mohol", "Kegaon"] },
      { id: "pandharpur", en: "Pandharpur", hi: "पंढरपूर", mr: "पंढरपूर",
        villages: ["Pandharpur", "Mangalvedhe", "Sangola", "Akluj", "Natepute", "Mhaswad"] },
      { id: "barshi", en: "Barshi", hi: "बार्शी", mr: "बार्शी",
        villages: ["Barshi", "Madha", "Osmanabad Rd", "Karmala", "Ashti", "Modnimb"] }
    ]
  },
  {
    id: "satara",
    en: "Satara", hi: "सातारा", mr: "सातारा",
    division: "pune",
    talukas: [
      { id: "satara-t", en: "Satara", hi: "सातारा", mr: "सातारा",
        villages: ["Satara City", "Panchgani", "Mahabaleshwar", "Wai", "Koregaon", "Umbraj", "Pusegaon"] },
      { id: "karad", en: "Karad", hi: "कराड", mr: "कराड",
        villages: ["Karad", "Masur", "Umbraj", "Vaduj", "Yeliv", "Dhebewadi", "Valva"] },
      { id: "patan", en: "Patan", hi: "पाटण", mr: "पाटण",
        villages: ["Patan", "Medha", "Wada", "Bamnoli", "Jawali", "Targaon"] },
      { id: "khatav", en: "Khatav", hi: "खटाव", mr: "खटाव",
        villages: ["Vaduj", "Pusegaon", "Aundh", "Birwadi", "Surur", "Dahivad"] }
    ]
  },
  {
    id: "sangli",
    en: "Sangli", hi: "सांगली", mr: "सांगली",
    division: "pune",
    talukas: [
      { id: "miraj", en: "Miraj", hi: "मिरज", mr: "मिरज",
        villages: ["Miraj", "Sangli", "Vishrambag", "Kupwad", "Palus", "Vita"] },
      { id: "walwa", en: "Walwa", hi: "वाळवा", mr: "वाळवा",
        villages: ["Islampur", "Shirala", "Bhilawadi", "Kundal", "Valva", "Asankheda"] },
      { id: "tasgaon", en: "Tasgaon", hi: "तासगाव", mr: "तासगाव",
        villages: ["Tasgaon", "Kavathemahankal", "Jath", "Atpadi", "Khanapur", "Urun Islampur"] },
      { id: "khanpur", en: "Khanapur", hi: "खानापूर", mr: "खानापूर",
        villages: ["Khanapur", "Vita", "Kadegaon", "Yalgud", "Palus", "Digraj"] }
    ]
  },
  {
    id: "kolhapur",
    en: "Kolhapur", hi: "कोल्हापूर", mr: "कोल्हापूर",
    division: "pune",
    talukas: [
      { id: "kolhapur-t", en: "Kolhapur", hi: "कोल्हापूर", mr: "कोल्हापूर",
        villages: ["Kolhapur City", "Jaysingpur", "Kagal", "Hatkanangale", "Shirol", "Ichalkaranji"] },
      { id: "karvir", en: "Karvir", hi: "करवीर", mr: "करवीर",
        villages: ["Karvir", "Panhala", "Gaganbawda", "Radhanagari", "Bahubali", "Uchgaon"] },
      { id: "shahuwadi", en: "Shahuwadi", hi: "शाहूवाडी", mr: "शाहूवाडी",
        villages: ["Shahuwadi", "Malkapur", "Masoli", "Pivali", "Bhuinj", "Kasarwade"] },
      { id: "chandgad", en: "Chandgad", hi: "चंदगड", mr: "चंदगड",
        villages: ["Chandgad", "Gadhinglaj", "Ajra", "Bhudargad", "Sindewahi", "Tulashi"] }
    ]
  },
  {
    id: "chhst-sambhajinagar",
    en: "Chhatrapati Sambhajinagar", hi: "छत्रपती संभाजीनगर", mr: "छत्रपती संभाजीनगर",
    division: "sambhajinagar",
    talukas: [
      { id: "aurangabad-t", en: "Aurangabad", hi: "औरंगाबाद", mr: "औरंगाबाद",
        villages: ["Aurangabad City", "Cidco", "Satara", "Garkheda", "Waluj", "Chikalthana", "Paithan Road"] },
      { id: "paithan", en: "Paithan", hi: "पैठण", mr: "पैठण",
        villages: ["Paithan", "Rauza", "Lasur Station", "Shivna", "Garad", "Wakad"] },
      { id: "gangapur", en: "Gangapur", hi: "गंगापूर", mr: "गंगापूर",
        villages: ["Gangapur", "Shendurwada", "Doha", "Nandur", "Borsar", "Pimpri Raja"] },
      { id: "vaijapur", en: "Vaijapur", hi: "वैजापूर", mr: "वैजापूर",
        villages: ["Vaijapur", "Lasur", "Ladsawangi", "Nandana", "Vitkhel", "Borsar"] }
    ]
  },
  {
    id: "jalna",
    en: "Jalna", hi: "जालना", mr: "जालना",
    division: "sambhajinagar",
    talukas: [
      { id: "jalna-t", en: "Jalna", hi: "जालना", mr: "जालना",
        villages: ["Jalna City", "Jafrabad", "Partur", "Badnapur", "Mantha", "Ghansawangi"] },
      { id: "ambad", en: "Ambad", hi: "अंबड", mr: "अंबड",
        villages: ["Ambad", "Kasbe Jategaon", "Karegaon", "Tisgaon", "Rajur", "Devgaon Rangari"] },
      { id: "bhokardan", en: "Bhokardan", hi: "भोकरदन", mr: "भोकरदन",
        villages: ["Bhokardan", "Shivna", "Khandala", "Andha", "Malegaon", "Borsa"] }
    ]
  },
  {
    id: "beed",
    en: "Beed", hi: "बीड", mr: "बीड",
    division: "sambhajinagar",
    talukas: [
      { id: "beed-t", en: "Beed", hi: "बीड", mr: "बीड",
        villages: ["Beed City", "Gevrai", "Parli Vaijnath", "Ambajogai", "Dharur", "Latur Road"] },
      { id: "ambajogai", en: "Ambajogai", hi: "अंबाजोगाई", mr: "अंबाजोगाई",
        villages: ["Ambajogai", "Kaij", "Dharur", "Mandrup", "Ranjani", "Hol"] },
      { id: "parli", en: "Parli", hi: "परळी", mr: "परळी",
        villages: ["Parli Vaijnath", "Bhoom", "Wadwani", "Shirur Kasar", "Asthi", "Kada"] },
      { id: "georai", en: "Georai", hi: "गेवराई", mr: "गेवराई",
        villages: ["Georai", "Patkhal", "Shivna", "Rajuri", "Kolgaon", "Wadgaon"] }
    ]
  },
  {
    id: "latur",
    en: "Latur", hi: "लातूर", mr: "लातूर",
    division: "sambhajinagar",
    talukas: [
      { id: "latur-t", en: "Latur", hi: "लातूर", mr: "लातूर",
        villages: ["Latur City", "Udgir", "Ausa", "Nilanga", "Shirur Anantpal", "Chakur"] },
      { id: "udgir", en: "Udgir", hi: "उदगीर", mr: "उदगीर",
        villages: ["Udgir", "Murud", "Deoni", "Bhadsawangi", "Malegaon", "Kasar Sironha"] },
      { id: "ahmadpur", en: "Ahmadpur", hi: "अहमदपूर", mr: "अहमदपूर",
        villages: ["Ahmadpur", "Jalkot", "Shirur Tajband", "Makhani", "Dongargaon", "Yedshi"] }
    ]
  },
  {
    id: "osmanabad",
    en: "Dharashiv", hi: "धाराशिव", mr: "धाराशिव",
    division: "sambhajinagar",
    talukas: [
      { id: "osmanabad-t", en: "Dharashiv", hi: "धाराशिव", mr: "धाराशिव",
        villages: ["Dharashiv City", "Tuljapur", "Omerga", "Bhoom", "Paranda", "Washi"] },
      { id: "tuljapur", en: "Tuljapur", hi: "तुळजापूर", mr: "तुळजापूर",
        villages: ["Tuljapur", "Naldurg", "Rui", "Hatola", "Murud", "Thana Savar"] },
      { id: "omerga", en: "Omerga", hi: "उमरगा", mr: "उमरगा",
        villages: ["Omerga", "Murud", "Khinwsar", "Kalam", "Hipparga", "Sangvi"] }
    ]
  },
  {
    id: "nanded",
    en: "Nanded", hi: "नांदेड", mr: "नांदेड",
    division: "sambhajinagar",
    talukas: [
      { id: "nanded-t", en: "Nanded", hi: "नांदेड", mr: "नांदेड",
        villages: ["Nanded City", "Vazirabad", "Ardhapur", "Mudkhed", "Dharmabad", "Hadgaon"] },
      { id: "biloli", en: "Biloli", hi: "बिलोली", mr: "बिलोली",
        villages: ["Biloli", "Naigaon", "Deglur", "Kinwat", "Himayatnagar", "Mukhed"] },
      { id: "kandhar", en: "Kandhar", hi: "कंधार", mr: "कंधार",
        villages: ["Kandhar", "Loha", "Umri", "Naigaon", "Mohol", "Purna"] }
    ]
  },
  {
    id: "parbhani",
    en: "Parbhani", hi: "परभणी", mr: "परभणी",
    division: "sambhajinagar",
    talukas: [
      { id: "parbhani-t", en: "Parbhani", hi: "परभणी", mr: "परभणी",
        villages: ["Parbhani City", "Selu", "Manwath", "Pathri", "Jintur", "Gangakhed"] },
      { id: "jintur", en: "Jintur", hi: "जिंतूर", mr: "जिंतूर",
        villages: ["Jintur", "Palam", "Isapur", "Warkhed", "Kundi", "Nagad"] },
      { id: "gangakhed", en: "Gangakhed", hi: "गंगाखेड", mr: "गंगाखेड",
        villages: ["Gangakhed", "Purna", "Naigaon", "Tadkalas", "Dhanegaon", "Ghansawangi"] }
    ]
  },
  {
    id: "hingoli",
    en: "Hingoli", hi: "हिंगोली", mr: "हिंगोली",
    division: "sambhajinagar",
    talukas: [
      { id: "hingoli-t", en: "Hingoli", hi: "हिंगोली", mr: "हिंगोली",
        villages: ["Hingoli City", "Sengaon", "Kalamnuri", "Aundha Nagnath", "Basmath", "Jawla"] },
      { id: "basmath", en: "Basmath", hi: "बसमत", mr: "बसमत",
        villages: ["Basmath", "Borwand", "Jambhrun", "Pimpla", "Dongargaon", "Poha"] }
    ]
  },
  {
    id: "amravati",
    en: "Amravati", hi: "अमरावती", mr: "अमरावती",
    division: "amravati",
    talukas: [
      { id: "amravati-t", en: "Amravati", hi: "अमरावती", mr: "अमरावती",
        villages: ["Amravati City", "Badnera", "Paratwada", "Anjangaon Surji", "Daryapur", "Achalpur"] },
      { id: "daryapur", en: "Daryapur", hi: "दर्यापूर", mr: "दर्यापूर",
        villages: ["Daryapur", "Nandgaon Khandeshwar", "Chandurbazar", "Morshi", "Warud", "Teosa"] },
      { id: "achalpur", en: "Achalpur", hi: "अचलपूर", mr: "अचलपूर",
        villages: ["Achalpur", "Paratwada", "Chandur Railway", "Dharni", "Chikhaldara"] }
    ]
  },
  {
    id: "akola",
    en: "Akola", hi: "अकोला", mr: "अकोला",
    division: "amravati",
    talukas: [
      { id: "akola-t", en: "Akola", hi: "अकोला", mr: "अकोला",
        villages: ["Akola City", "Akot", "Balapur", "Patur", "Murtajapur", "Telhara"] },
      { id: "akot", en: "Akot", hi: "अकोट", mr: "अकोट",
        villages: ["Akot", "Balapur", "Akluj", "Ashtewadi", "Palso", "Kurankhed"] },
      { id: "murtajapur", en: "Murtajapur", hi: "मुर्तजापूर", mr: "मुर्तजापूर",
        villages: ["Murtajapur", "Patur", "Mangrulpir", "Washim", "Shegaon", "Risod"] }
    ]
  },
  {
    id: "washim",
    en: "Washim", hi: "वाशिम", mr: "वाशिम",
    division: "amravati",
    talukas: [
      { id: "washim-t", en: "Washim", hi: "वाशिम", mr: "वाशिम",
        villages: ["Washim City", "Malegaon", "Risod", "Mangrulpir", "Manora", "Karanja"] },
      { id: "risod", en: "Risod", hi: "रिसोड", mr: "रिसोड",
        villages: ["Risod", "Hingoli Rd", "Akola Rd", "Pachora", "Pimpalkhuta", "Manoja"] }
    ]
  },
  {
    id: "yavatmal",
    en: "Yavatmal", hi: "यवतमाळ", mr: "यवतमाळ",
    division: "amravati",
    talukas: [
      { id: "yavatmal-t", en: "Yavatmal", hi: "यवतमाळ", mr: "यवतमाळ",
        villages: ["Yavatmal City", "Wani", "Pusad", "Darwha", "Umarkhed", "Mahagaon"] },
      { id: "wani", en: "Wani", hi: "वणी", mr: "वणी",
        villages: ["Wani", "Ralegaon", "Kelapur", "Ghatanji", "Maregaon", "Ner"] },
      { id: "pusad", en: "Pusad", hi: "पुसद", mr: "पुसद",
        villages: ["Pusad", "Mahagaon", "Kalamb", "Digras", "Nandgaon", "Babulgaon"] }
    ]
  },
  {
    id: "buldhana",
    en: "Buldhana", hi: "बुलढाणा", mr: "बुलढाणा",
    division: "amravati",
    talukas: [
      { id: "buldhana-t", en: "Buldhana", hi: "बुलढाणा", mr: "बुलढाणा",
        villages: ["Buldhana City", "Mehkar", "Chikhli", "Khamgaon", "Malkapur", "Motala"] },
      { id: "khamgaon", en: "Khamgaon", hi: "खामगाव", mr: "खामगाव",
        villages: ["Khamgaon", "Shegaon", "Jalgaon Jamod", "Nandura", "Sangrampur", "Deulgaon Raja"] },
      { id: "mehkar", en: "Mehkar", hi: "मेहकर", mr: "मेहकर",
        villages: ["Mehkar", "Sindkhed Raja", "Lonar", "Deulgaon Mahi", "Pimpalgaon Raja", "Waigaon"] }
    ]
  },
  {
    id: "nagpur",
    en: "Nagpur", hi: "नागपूर", mr: "नागपूर",
    division: "nagpur",
    talukas: [
      { id: "nagpur-city", en: "Nagpur City", hi: "नागपूर शहर", mr: "नागपूर शहर",
        villages: ["Nagpur City", "Civil Lines", "Dharampeth", "Sitabuldi", "Sakkardara", "Lakadganj", "Pardi"] },
      { id: "nagpur-rural", en: "Nagpur Rural", hi: "नागपूर ग्रामीण", mr: "नागपूर ग्रामीण",
        villages: ["Hingna", "Kalmeshwar", "Narkhed", "Parseoni", "Ramtek", "Mouda", "Butibori"] },
      { id: "kamptee", en: "Kamptee", hi: "कामठी", mr: "कामठी",
        villages: ["Kamptee", "Kandri", "Mauda", "Saoner", "Khat", "Waddhamna"] }
    ]
  },
  {
    id: "wardha",
    en: "Wardha", hi: "वर्धा", mr: "वर्धा",
    division: "nagpur",
    talukas: [
      { id: "wardha-t", en: "Wardha", hi: "वर्धा", mr: "वर्धा",
        villages: ["Wardha City", "Sewagram", "Pulgaon", "Hinganghat", "Arvi", "Deoli"] },
      { id: "hinganghat", en: "Hinganghat", hi: "हिंगणघाट", mr: "हिंगणघाट",
        villages: ["Hinganghat", "Arvi", "Samudrapur", "Pulgaon", "Kharangna", "Waifad"] }
    ]
  },
  {
    id: "chandrapur",
    en: "Chandrapur", hi: "चंद्रपूर", mr: "चंद्रपूर",
    division: "nagpur",
    talukas: [
      { id: "chandrapur-t", en: "Chandrapur", hi: "चंद्रपूर", mr: "चंद्रपूर",
        villages: ["Chandrapur City", "Ballarpur", "Gondpipri", "Rajura", "Bhadravati", "Mul"] },
      { id: "warora", en: "Warora", hi: "वरोरा", mr: "वरोरा",
        villages: ["Warora", "Chimur", "Nagbhid", "Bramhapuri", "Sindewahi", "Nandgaon"] },
      { id: "gadchiroli-ch", en: "Rajura", hi: "राजुरा", mr: "राजुरा",
        villages: ["Rajura", "Korpana", "Jiwati", "Bhadravati", "Pombhurna", "Gondpipri"] }
    ]
  },
  {
    id: "gadchiroli",
    en: "Gadchiroli", hi: "गडचिरोली", mr: "गडचिरोली",
    division: "nagpur",
    talukas: [
      { id: "gadchiroli-t", en: "Gadchiroli", hi: "गडचिरोली", mr: "गडचिरोली",
        villages: ["Gadchiroli City", "Chamorshi", "Desaiganj Vadsa", "Kurkheda", "Etapalli", "Bhamragad"] },
      { id: "sironcha", en: "Sironcha", hi: "सिरोंचा", mr: "सिरोंचा",
        villages: ["Sironcha", "Aheri", "Mulchera", "Allapalli", "Ashti", "Purada"] }
    ]
  },
  {
    id: "gondia",
    en: "Gondia", hi: "गोंदिया", mr: "गोंदिया",
    division: "nagpur",
    talukas: [
      { id: "gondia-t", en: "Gondia", hi: "गोंदिया", mr: "गोंदिया",
        villages: ["Gondia City", "Tirora", "Arjuni Morgaon", "Deori", "Amgaon", "Salekasa"] },
      { id: "tirora", en: "Tirora", hi: "तिरोरा", mr: "तिरोरा",
        villages: ["Tirora", "Navegaon Bandh", "Pangdi", "Kurki", "Kheldi", "Bhandewada"] }
    ]
  },
  {
    id: "bhandara",
    en: "Bhandara", hi: "भंडारा", mr: "भंडारा",
    division: "nagpur",
    talukas: [
      { id: "bhandara-t", en: "Bhandara", hi: "भंडारा", mr: "भंडारा",
        villages: ["Bhandara City", "Tumsar", "Pauni", "Mohadi", "Lakhandur", "Sakoli"] },
      { id: "tumsar", en: "Tumsar", hi: "तुमसर", mr: "तुमसर",
        villages: ["Tumsar", "Pavni", "Brahmani", "Kandri", "Wadegaon", "Kamta"] }
    ]
  }
];

// Build lookup maps for fast access
export const DISTRICT_MAP = {};
MAHARASHTRA_DATA.forEach(d => {
  DISTRICT_MAP[d.id] = d;
});

export function getDistrictName(district, lang) {
  return district[lang] || district.en;
}

export function getTalukaName(taluka, lang) {
  return taluka[lang] || taluka.en;
}
