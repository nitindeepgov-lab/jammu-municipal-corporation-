const { Client } = require('pg');
require('dotenv').config({ path: '/Users/nitindeepsingh/Developer/JMC/jammu-municipal-corporation-/cms/.env' });

const officersData = [
  {
    name: "Devansh Yadav, IAS",
    designation: "Commissioner",
    office: "2542192, 2547846",
    mobile: "9797999495",
    email: "mc.jmc@jk.gov.in",
  },
  {
    name: "Rajeev Khajuria, JKAS",
    designation: "Joint Commissioner (Adm.)",
    office: "2546252",
    mobile: "9906069409",
  },
  {
    name: "Subah Mehta, JKAS",
    designation: "Joint Commissioner (R&E)",
    office: "",
    mobile: "9419145837",
  },
  {
    name: "Abdul Star, JKAS",
    designation: "Joint Commissioner (H & S)",
    office: "",
    mobile: "9419027458",
  },
  {
    name: "Chand Singh, JKAS",
    designation: "Secretary",
    office: "",
    mobile: "7006046450",
    email: "secy.jmcjmu@gmail.com",
  },
  {
    name: "Sanjay Badyal, JKAS",
    designation: "Deputy Commissioner (North)",
    office: "",
    mobile: "9419137292",
  },
  {
    name: "Lal Chand, JKAS",
    designation: "Deputy Commissioner (South)",
    office: "",
    mobile: "7889455797",
  },
  {
    name: "Amit Kumar, JKAS",
    designation: "Financial Advisor / CAO",
    office: "",
    mobile: "9419383788",
  },
  {
    name: "Sunil Gandotra",
    designation: "Superintending Engineer, PHE",
    office: "",
    mobile: "9419147521",
  },
  {
    name: "Dr. Vinod Sharma",
    designation: "Health Officer",
    office: "",
    mobile: "9419182088",
  },
  {
    name: "Firdous Ahmed Qazi",
    designation: "Joint Commissioner (Works)",
    office: "",
    mobile: "7006129804",
  },
  {
    name: "Manoj Kumar",
    designation: "Senior Town Planner",
    office: "",
    mobile: "9419162344",
  },
  {
    name: "Nawaz Ahmed Banday",
    designation: "Executive Engineer (Division-II)",
    office: "",
    mobile: "8803274201",
  },
  {
    name: "Akhil Dutt",
    designation: "Executive Engineer (Division-III)",
    office: "",
    mobile: "7889856380",
  },
  {
    name: "Yasir Bashir Kichloo",
    designation: "Executive Engineer (Division-IV)",
    office: "",
    mobile: "9419184058",
  },
  {
    name: "Janak Singh",
    designation: "Executive Engineer (Projects Division)",
    office: "",
    mobile: "9419161201",
  },
  {
    name: "S.P. Singh, JKAS",
    designation: "Executive Engineer (Electrical)",
    office: "",
    mobile: "9149767538",
  },
  {
    name: "Er. Rayaz-ul-Hussan Mir",
    designation: "Executive Engineer (Mechanical)",
    office: "",
    mobile: "9419211990",
  },
  {
    name: "Vijay Singh Manhas",
    designation: "Executive Engineer, UEED",
    office: "",
    mobile: "9419142784",
  },
  {
    name: "Dharam Vir Singh",
    designation: "Chief Transport Officer (Zone III)",
    office: "",
    mobile: "7780888736",
  },
  {
    name: "Talat Mehmood Khan",
    designation: "Chief Transport Officer (Zone I & II)",
    office: "",
    mobile: "7006480719",
  },
  {
    name: "Dr. Jaswant Singh, JKAS",
    designation: "Municipal Veterinary Officer",
    office: "",
    mobile: "9797682216",
  },
  {
    name: "Dr. Gaurav Chowdhary",
    designation: "Animal Welfare Officer",
    office: "",
    mobile: "9797371677",
  },
  {
    name: "Kamal Kishore",
    designation: "Building Officer",
    office: "",
    mobile: "8492081239",
  },
  {
    name: "Kapil Khajuria",
    designation: "Building Officer",
    office: "",
    mobile: "9018896437",
  },
  {
    name: "Parveen Gupta",
    designation: "Private Secretary to Commissioner",
    office: "2542192",
    mobile: "9419104451",
    email: "commissionerjmc@gmail.com",
  },
];

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to Neon database successfully!');

    let updatedCount = 0;
    let notFoundCount = 0;

    for (const officer of officersData) {
      // Find matches in the officials table (trim spaces)
      const res = await client.query(
        'SELECT id, name FROM officials WHERE TRIM(name) = $1 OR TRIM(name) = $2',
        [officer.name.trim(), officer.name.replace(', JKAS', '').replace(', IAS', '').trim()]
      );

      if (res.rows.length > 0) {
        const dbId = res.rows[0].id;
        
        // Update the row
        await client.query(
          `UPDATE officials 
           SET email = $1, mobile = $2, office_phone = $3 
           WHERE id = $4`,
          [officer.email || null, officer.mobile || null, officer.office || null, dbId]
        );
        
        console.log(`✅ Updated: "${officer.name}" (ID: ${dbId})`);
        updatedCount++;
      } else {
        console.warn(`⚠️ Warning: Not found in database: "${officer.name}"`);
        notFoundCount++;
      }
    }

    console.log(`\n🎉 Process finished! Updated: ${updatedCount}, Not Found: ${notFoundCount}`);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
  }
}

main();
