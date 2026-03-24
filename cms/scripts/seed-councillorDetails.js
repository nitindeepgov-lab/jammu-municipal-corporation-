'use strict';

/**
 * Seed script for Ex-Municipal Councillor details
 *
 * Usage: node scripts/seed-councillorDetails.js
 *
 * Optional photo naming convention for ward-wise photos:
 *   data/uploads/councillors/<ward_no>.jpg|jpeg|png|webp
 * Example:
 *   data/uploads/councillors/1.jpg
 *
 * Fallback photo (used when ward-specific photo is missing):
 *   data/uploads/default-image.png
 */

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

const UPLOADS_DIR = path.join(__dirname, '..', 'data', 'uploads');
const COUNCILLOR_UPLOADS_DIR = path.join(UPLOADS_DIR, 'councillors');
const FALLBACK_PHOTO = 'default-image.png';
const PHOTO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
const photoCache = new Map();

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function getFileData(absFilePath) {
  const size = getFileSizeInBytes(absFilePath);
  const ext = path.extname(absFilePath).replace('.', '');
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: absFilePath,
    originalFileName: path.basename(absFilePath),
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(strapi, absFilePath, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: getFileData(absFilePath),
      data: {
        fileInfo: {
          alternativeText: `${name} photo`,
          caption: name,
          name,
        },
      },
    });
}

async function getOrUploadPhoto(strapi, absFilePath) {
  if (photoCache.has(absFilePath)) {
    return photoCache.get(absFilePath);
  }

  const fileBaseName = path.basename(absFilePath, path.extname(absFilePath));
  const existing = await strapi.query('plugin::upload.file').findOne({
    where: { name: fileBaseName },
  });

  if (existing) {
    photoCache.set(absFilePath, existing);
    return existing;
  }

  const [uploaded] = await uploadFile(strapi, absFilePath, fileBaseName);
  photoCache.set(absFilePath, uploaded);
  return uploaded;
}

function resolvePhotoPath(wardNo) {
  for (const ext of PHOTO_EXTENSIONS) {
    const candidate = path.join(COUNCILLOR_UPLOADS_DIR, `${wardNo}.${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const fallback = path.join(UPLOADS_DIR, FALLBACK_PHOTO);
  if (fs.existsSync(fallback)) {
    return fallback;
  }

  return null;
}

function normalizeCouncillor(councillor) {
  return {
    ward_no: Number(councillor.ward_no),
    name: councillor.name,
    party_name: councillor.party_name || '',
    address: councillor.address || '',
    email_id: councillor.email_id || '',
    contact_no: councillor.contact_no || '',
    publishedAt: Date.now(),
  };
}

async function upsertCouncillor(strapi, councillor, photo) {
  const uid = 'api::councillor-detail.councillor-detail';
  const data = {
    ...normalizeCouncillor(councillor),
    ...(photo ? { photo } : {}),
  };
  let documentId;

  const existing = await strapi.db.query(uid).findOne({
    where: { ward_no: Number(councillor.ward_no) },
  });

  if (existing?.documentId) {
    const updated = await strapi.documents(uid).update({
      documentId: existing.documentId,
      data,
    });
    documentId = updated?.documentId || existing.documentId;
  } else {
    const created = await strapi.documents(uid).create({ data });
    documentId = created?.documentId;
  }

  if (documentId) {
    await strapi.documents(uid).publish({ documentId });
  }

  return existing?.documentId ? 'updated' : 'created';
}

const councillorData = [
  {
    "ward_no": "1",
    "name": "SMT. PURNIMA SHARMA",
    "party_name": "BJP",
    "address": "H. NO. 79 KOOCHA NAHAR SINGH, PANJTIRTHI",
    "email_id": "",
    "contact_no": "9419164044"
  },
  {
    "ward_no": "2",
    "name": "Lt. SH. JAGDISH KUMAR SHARMA",
    "party_name": "INDEPENDENT",
    "address": "301 JHULLAKA MOHALLA",
    "email_id": "",
    "contact_no": "9419306901, 9149698611"
  },
  {
    "ward_no": "3",
    "name": "SH. NAROTAM SHARMA",
    "party_name": "BJP",
    "address": "H.NO. 170 DHAKKI SARAJAN, JAMMU",
    "email_id": "",
    "contact_no": "9419212231"
  },
  {
    "ward_no": "4",
    "name": "SMT. SUNITA KOUL",
    "party_name": "BJP",
    "address": "KALI JANI JAMMU",
    "email_id": "",
    "contact_no": "9419129137"
  },
  {
    "ward_no": "5",
    "name": "SH. GOPAL GUPTA",
    "party_name": "BJP",
    "address": "218 MOHALLA BABA JEEVAN SHAH, JAMMU",
    "email_id": "",
    "contact_no": "7006108155, 9419182701"
  },
  {
    "ward_no": "6",
    "name": "MOHI-UD-DIN CHOUDHARY",
    "party_name": "CONGRESS",
    "address": "H.NO. 59 LOWER GUJJAR NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "7889366247"
  },
  {
    "ward_no": "7",
    "name": "SMT. RITU CHOUDHARY",
    "party_name": "CONGRESS",
    "address": "H.NO. 496 PREM NAGAR NEAR GRAVE YARD, JAMMU",
    "email_id": "",
    "contact_no": "8492024231"
  },
  {
    "ward_no": "8",
    "name": "SH. AKSHAY SHARMA",
    "party_name": "BJP",
    "address": "H. NO. 19 NEW REHARI, JAMMU",
    "email_id": "",
    "contact_no": "7006922770, 9419319908"
  },
  {
    "ward_no": "9",
    "name": "SH. SUNEET KUMAR RAINA",
    "party_name": "BJP",
    "address": "H.NO. 49 LANE 2 KARAN NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419127550, 01912577550"
  },
  {
    "ward_no": "10",
    "name": "SH. ANIL KUMAR",
    "party_name": "BJP",
    "address": "H.NO. 167/2 MOHALLA PAHARIAN",
    "email_id": "",
    "contact_no": "9797431283"
  },
  {
    "ward_no": "11",
    "name": "SMT. ANITA SHARMA",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 91 MALHOTRA STREET, JAMMU",
    "email_id": "",
    "contact_no": "9419872311"
  },
  {
    "ward_no": "12",
    "name": "SH. JEET KUMAR",
    "party_name": "BJP",
    "address": "409/6 KRISHNA NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419183268, 7889406090"
  },
  {
    "ward_no": "13",
    "name": "SMT. RAMA",
    "party_name": "CONGRESS",
    "address": "13 RESHAM GHAR COLONY",
    "email_id": "",
    "contact_no": "9419197144, 7006316811"
  },
  {
    "ward_no": "14",
    "name": "SH. PARMOD KAPAHI",
    "party_name": "BJP",
    "address": "59 ASHOK NAGAR, CANAL ROAD, JAMMU",
    "email_id": "",
    "contact_no": "9419199494"
  },
  {
    "ward_no": "15",
    "name": "SMT. SANDHYA GUPTA",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 101 RAGHUNATH PURA, JAMMU",
    "email_id": "",
    "contact_no": "7006125847"
  },
  {
    "ward_no": "16",
    "name": "SH. RAJINDER SHARMA",
    "party_name": "BJP",
    "address": "782/F PREM NAGAR, NEW PLOT, JAMMU",
    "email_id": "",
    "contact_no": "9419126948"
  },
  {
    "ward_no": "17",
    "name": "MISS NIDHI MANGOTRA",
    "party_name": "BJP",
    "address": "255 PURAN NAGAR, NEW PLOT, POST OFFICFE LANE, JAMMU",
    "email_id": "",
    "contact_no": "9682350959"
  },
  {
    "ward_no": "18",
    "name": "SH. DINESH GUPTA",
    "party_name": "BJP",
    "address": "Q.NO. 70 SARWAL COLONY, JAMMU",
    "email_id": "",
    "contact_no": "9419101256, 9149961248"
  },
  {
    "ward_no": "19",
    "name": "SH. AMIT GUPTA",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 51 CHAND NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9906114117"
  },
  {
    "ward_no": "20",
    "name": "SH. RAHUL KUMAR",
    "party_name": "BJP",
    "address": "6A-A/B, GANDHI NAGAR NEAR AQUAF MARKET, JAMMU",
    "email_id": "",
    "contact_no": "9086094655"
  },
   {
    "ward_no": "21",
    "name": "MISS BHANU MAHAJAN",
    "party_name": "CONGRESS",
    "address": "H.NO. 75 A/P IIND EXTN. GANDHI NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "8826737775"
  },
  {
    "ward_no": "22",
    "name": "SH. JAIDEEP SHARMA",
    "party_name": "BJP",
    "address": "51 NEAR RAM DARBAR MANDIR, SHASTRI NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419197462"
  },
  {
    "ward_no": "23",
    "name": "SH. PAWAN SINGH",
    "party_name": "BJP",
    "address": "711 ASHOK NAGAR, SATWARI, JAMMU",
    "email_id": "",
    "contact_no": "9419186980"
  },
  {
    "ward_no": "24",
    "name": "SMT. ANU BALI",
    "party_name": "INDEPENDENT",
    "address": "Q.NO. 201 REHARI COLONY, JAMMU",
    "email_id": "",
    "contact_no": "9622891166"
  },
  {
    "ward_no": "25",
    "name": "SH. ARUN KUMAR KHANNA",
    "party_name": "BJP",
    "address": "Q.NO. 163 REHARI COLONY, JAMMU",
    "email_id": "",
    "contact_no": "9419719150"
  },
  {
    "ward_no": "26",
    "name": "SH. HARDEEP SINGH (MANKOTIA)",
    "party_name": "BJP",
    "address": "H.NO. 965 L.NO. 14 SUBASH NAGAR",
    "email_id": "",
    "contact_no": "9419197058"
  },
  {
    "ward_no": "27",
    "name": "SMT. CHARANJEET KOUR",
    "party_name": "CONGRESS",
    "address": "H.NO. 206 MAHESHPURA BAKSHI NAGAR",
    "email_id": "",
    "contact_no": "9419149879, 9796689401"
  },
  {
    "ward_no": "28",
    "name": "SH. GOURAV CHOPRA",
    "party_name": "CONGRESS",
    "address": "126 BAKSHI NAGAR NEAR GEETA MANDIR, JAMMU",
    "email_id": "",
    "contact_no": "9419253350, 9419147884"
  },
  {
    "ward_no": "29",
    "name": "SH. SURINDER SINGH",
    "party_name": "BJP",
    "address": "280 SHAKTI NAGAR",
    "email_id": "",
    "contact_no": "9419184250"
  },
  {
    "ward_no": "30",
    "name": "SMT. SONIKA SHARMA",
    "party_name": "CONGRESS",
    "address": "H.NO. 257 F L/NO. 8 TALAB TILLO, JAMMU",
    "email_id": "",
    "contact_no": "9682179892, 9419185397"
  },

  {
    "ward_no": "31",
    "name": "SH. SUCHA SINGH",
    "party_name": "INDEPENDENT",
    "address": "16/B BHAWANI NAGAR, TALAB TILLO, JAMMU",
    "email_id": "",
    "contact_no": "9419183424"
  },
  {
    "ward_no": "32",
    "name": "SH. SAT PAUL KARLUPIA",
    "party_name": "BJP",
    "address": "56 INDRA COLONY, CAMP ROAD, TALAB TILLO, JAMMU",
    "email_id": "",
    "contact_no": "9906076744, 9149441526"
  },
  {
    "ward_no": "33",
    "name": "SH. CHANDER MOHAN GUPTA",
    "party_name": "BJP",
    "address": "F 45 LOWER SHIV NAGAR, BEHIND A.G. OFFICE, JAMMU",
    "email_id": "",
    "contact_no": "0191-2581303, 2520023"
  },
  {
    "ward_no": "34",
    "name": "SMT. RANI DEVI",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 53 HARIJAN COLONY, OLD JANIPUR, JAMMU",
    "email_id": "",
    "contact_no": "7889417274"
  },
  {
    "ward_no": "35",
    "name": "SH. YASH PAUL SHARMA",
    "party_name": "BJP",
    "address": "H.NO. 2/72 SHANT NAGAR, OLD JANIPUR, JAMMU",
    "email_id": "",
    "contact_no": "9419195140"
  },
  {
    "ward_no": "36",
    "name": "SH. SUBHASH SHARMA",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 190/A INDRA COLONY, LAKAR MANDI, JAMMU",
    "email_id": "",
    "contact_no": "9419131385"
  },
  {
    "ward_no": "37",
    "name": "SMT. SUNITA GUPTA",
    "party_name": "BJP",
    "address": "H.NO. 224 NEAR SFRI COMPLEX JANIPUR, JAMMU",
    "email_id": "",
    "contact_no": "9419702766, 9149914729"
  },
  {
    "ward_no": "38",
    "name": "SH. SURINDER SHARMA",
    "party_name": "BJP",
    "address": "H.NO. 103/2 PAMPOSH COLONY, JANIPUR, JAMMU",
    "email_id": "",
    "contact_no": "9086024978, 7006071334"
  },
  {
    "ward_no": "39",
    "name": "SH. RAJINDER SINGH JAMWAL",
    "party_name": "CONGRESS",
    "address": "H.NO. 39 TOPH SHERKHANIA, JAMMU",
    "email_id": "",
    "contact_no": "9419181609, 7006935272"
  },
  {
    "ward_no": "40",
    "name": "SMT. NEELAM",
    "party_name": "BJP",
    "address": "L.NO. 117/4 KABIR NAGAR, POONCH HOUSE, JAMMU",
    "email_id": "",
    "contact_no": "9070643926, 9682364009"
  },
  {
    "ward_no": "41",
    "name": "SH. SANJAY KUMAR",
    "party_name": "BJP",
    "address": "SHANKER VIHAR, TALAB TILLO",
    "email_id": "",
    "contact_no": "9906020100, 9419220875"
  },
  {
    "ward_no": "42",
    "name": "Lt. SMT. VIJAY CHOUDHARY",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 42-43/5 NANAK NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "6005299706"
  },
  {
    "ward_no": "43",
    "name": "SH. SURJEET SINGH",
    "party_name": "BJP",
    "address": "H.NO. F 1298 SEC 6 STREET NO. 8 NANAK NAGAR",
    "email_id": "",
    "contact_no": "9858175477"
  },
  {
    "ward_no": "44",
    "name": "SH. INDER SINGH SUDAN",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 153/7 L.NO. 5 GURU NANAK NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419188448"
  },
  {
    "ward_no": "45",
    "name": "Lt. SMT. RAJ RANI",
    "party_name": "BJP",
    "address": "L.NO. 6 RANI TALAB, DIGIANA, JAMMU",
    "email_id": "",
    "contact_no": "9419137053"
  },
  {
    "ward_no": "46",
    "name": "SH. DWARKA NATH CHOWDHARY",
    "party_name": "CONGRESS",
    "address": "H.NO. 234/4 SANJAY NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419187653"
  },
  {
    "ward_no": "47",
    "name": "SMT. SHARDA KUMARI",
    "party_name": "BJP",
    "address": "H.NO. 323 OLD BAHU BASTI",
    "email_id": "",
    "contact_no": "7889537267"
  },
  {
    "ward_no": "48",
    "name": "SH. SHAM LAL",
    "party_name": "INDEPENDENT",
    "address": "GORKHA NAGAR, BAHU FORT, JAMMU",
    "email_id": "",
    "contact_no": "7889944265"
  },
  {
    "ward_no": "49",
    "name": "SH. KAMAL SINGH JAMWAL",
    "party_name": "CONGRESS",
    "address": "H.NO. 257 RAJPUT MOHALLA, CHANNI RAMA",
    "email_id": "",
    "contact_no": "7780995348, 7051592357"
  },
  {
    "ward_no": "50",
    "name": "SMT. NEENA GUPTA",
    "party_name": "BJP",
    "address": "247/6 CHANNI HIMMAT, JAMMU",
    "email_id": "",
    "contact_no": "9419109799"
  },{
    "ward_no": "51",
    "name": "SH. RAJ KUMAR",
    "party_name": "INDEPENDENT",
    "address": "176/2 CHANNI HIMMAT",
    "email_id": "",
    "contact_no": "9149674319"
  },
  {
    "ward_no": "52",
    "name": "SH. AJAY GUPTA",
    "party_name": "BJP",
    "address": "4/1-A SOUTH EXTENSION TRIKUTA NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419139516"
  },
  {
    "ward_no": "53",
    "name": "SMT. JYOTI DEVI",
    "party_name": "BJP",
    "address": "219/3 VASANT VIHAR, TRIKUTA NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9797591912, 9419130922"
  },
  {
    "ward_no": "54",
    "name": "SH. NEERAJ PURI",
    "party_name": "BJP",
    "address": "H.NO. 160/13 NANAK NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419198240, 0191-2453518"
  },
  {
    "ward_no": "55",
    "name": "SH. PRITAM SINGH",
    "party_name": "CONGRESS",
    "address": "KUNJWANI TALAB, P.O. GANGYAL, JAMMU",
    "email_id": "",
    "contact_no": "9419205119"
  },
  {
    "ward_no": "56",
    "name": "SH. BALDEV SINGH",
    "party_name": "BJP",
    "address": "H. NO. 100 W. NO. 56 GANGYAL, JAMMU",
    "email_id": "",
    "contact_no": "9419184504"
  },
  {
    "ward_no": "57",
    "name": "SMT. INDERJEET KOUR RANDHAWA",
    "party_name": "CONGRESS",
    "address": "54/1 MODEL TOWN, GANGYAL-2, JAMMU",
    "email_id": "",
    "contact_no": "9103313000"
  },
  {
    "ward_no": "58",
    "name": "SMT. TIRATH KOUR",
    "party_name": "BJP",
    "address": "H.NO. 211 MAIN ROAD, DIGIANA",
    "email_id": "",
    "contact_no": "9419188470, 9419188420"
  },
  {
    "ward_no": "59",
    "name": "SH. ASHOK SINGH",
    "party_name": "INDEPENDENT",
    "address": "BANK COLONY OPP. BUA DEVI PARK PALOURA, JAMMU",
    "email_id": "",
    "contact_no": "9419140548"
  },
  {
    "ward_no": "60",
    "name": "SMT. RAJNI BALA",
    "party_name": "CONGRESS",
    "address": "MOHALLA PAROCH NEAR POST OFFICE PALOURA, JAMMU",
    "email_id": "",
    "contact_no": "9419110227"
  },{
    "ward_no": "61",
    "name": "SH. MOHINDER KUMAR",
    "party_name": "BJP",
    "address": "H.NO. 24 NEAR K.C. GURUKUL COLLEGE PATTA PALOURA, JAMMU",
    "email_id": "",
    "contact_no": "9419123686"
  },
  {
    "ward_no": "62",
    "name": "SMT. REKHA MANHAS",
    "party_name": "BJP",
    "address": "H.NO. 99 SEC. B-1 LAXMIPURAM CHINORE, JAMMU",
    "email_id": "",
    "contact_no": "9682632603"
  },
  {
    "ward_no": "63",
    "name": "SH. KULDEEP SINGH",
    "party_name": "BJP",
    "address": "L.NO. 3 SEC. 2 NEAR SHIV MANDIR KAMAL NAGAR, BANTALAB, JAMMU",
    "email_id": "",
    "contact_no": "9858013378, 9149988920"
  },
  {
    "ward_no": "64",
    "name": "SH. KAPIL SINGH CHIB",
    "party_name": "BJP",
    "address": "DURGA NAGAR SEC. 3 CHIB MOHALLA, JAMMU",
    "email_id": "",
    "contact_no": "9419107717, 7006613403"
  },
  {
    "ward_no": "65",
    "name": "SMT. ANITA SHARMA",
    "party_name": "INDEPENDENT",
    "address": "SHEELA VIDYA NIWAS PATOLI BRAHMANA, JAMMU",
    "email_id": "",
    "contact_no": "9419783111"
  },
  {
    "ward_no": "66",
    "name": "SMT. TRIPTA DEVI",
    "party_name": "BJP",
    "address": "BUTTA NAGAR, PALOURA, JAMMU",
    "email_id": "",
    "contact_no": "9906186929, 9149515637"
  },
  {
    "ward_no": "67",
    "name": "SH. SURAJ PARKASH",
    "party_name": "BJP",
    "address": "H.NO. 4 LAKSHMI NAGAR, SEC. 1 MUTHI, JAMMU",
    "email_id": "",
    "contact_no": "9469174145, 9682330574"
  },
  {
    "ward_no": "68",
    "name": "SH. ANIL KUMAR",
    "party_name": "BJP",
    "address": "H.NO. 117/10 GREATER KAILASH, JAMMU",
    "email_id": "",
    "contact_no": "9103000003"
  },
  {
    "ward_no": "69",
    "name": "SMT. GURMEET KOUR RANDHAWA",
    "party_name": "BJP",
    "address": "H.NO. 55 EXTENSION SECTOR-D SAINIK COLONY, JAMMU",
    "email_id": "",
    "contact_no": "9419210856"
  },
  {
    "ward_no": "70",
    "name": "SH. NARINDER SINGH",
    "party_name": "BJP",
    "address": "H.NO. 9 SECTOR-G SAINIK COLONY, JAMMU",
    "email_id": "",
    "contact_no": "9419198588"
  },
  {
    "ward_no": "71",
    "name": "SMT. SHAMA AKHTER",
    "party_name": "INDEPENDENT",
    "address": "NEAR J&K BANK BYE-PASS SIDHRA, JAMMU",
    "email_id": "",
    "contact_no": "9419126119"
  },
  {
    "ward_no": "72",
    "name": "SH. RACHPAL BHARDWAJ",
    "party_name": "CONGRESS",
    "address": "SHEHZADPUR KENIYA, JAMMU",
    "email_id": "",
    "contact_no": "9682512441"
  },
  {
    "ward_no": "73",
    "name": "SH. YOUDHVIR SINGH",
    "party_name": "INDEPENDENT",
    "address": "H.NO. 36 SEC. 4 RAILWAY ROAD, NANAK NAGAR, JAMMU",
    "email_id": "",
    "contact_no": "9419132071"
  },
  {
    "ward_no": "74",
    "name": "SH. SOBAT ALI",
    "party_name": "INDEPENDENT",
    "address": "CHOWADHI, TEH. BAHU, DISTT. JAMMU",
    "email_id": "",
    "contact_no": "9419127378"
  },
  {
    "ward_no": "75",
    "name": "SH. GHAR SINGH CHIB",
    "party_name": "INDEPENDENT",
    "address": "VILL. AKALPUR P.O AKALPUR",
    "email_id": "",
    "contact_no": "8492010517"
  }
];

async function seed() {
  console.log('🌱 Seeding Ex-Municipal Councillor Details...\n');

  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  for (const councillor of councillorData) {
    try {
      const photoPath = resolvePhotoPath(Number(councillor.ward_no));
      const photo = photoPath ? await getOrUploadPhoto(app, photoPath) : null;
      const action = await upsertCouncillor(app, councillor, photo);
      const photoLabel = photoPath ? path.basename(photoPath) : 'no-photo';
      console.log(`  ✅ [${action}] Ward ${councillor.ward_no} — ${councillor.name} (${photoLabel})`);
    } catch (error) {
      console.log(`  ⚠️  Ward ${councillor.ward_no} — ${error.message}`);
    }
  }

  console.log('\n✨ Councillor seeding complete!\n');
  console.log('IMPORTANT: Go to Strapi Admin → Settings → Roles → Public');
  console.log('  and enable "find" and "findOne" for Councillor Detail.');
  console.log('  Also publish entries from Content Manager.\n');

  process.exit(0);
}

seed().catch(console.error);