'use strict';

/**
 * Seeds the newsletters collection with all current historical newsletters.
 * Usage: node scripts/seed-newsletters.js
 */

const newsletters = [
  // 2025
  { year: 2025, month: 'April',     pdf: '1520255015119.pdf' },
  { year: 2025, month: 'March',     pdf: '1520254014977.pdf' },
  { year: 2025, month: 'February',  pdf: '1520253014836.pdf' },
  { year: 2025, month: 'January',   pdf: '1520252014695.pdf' },
  // 2024
  { year: 2024, month: 'December',  pdf: '1520241214554.pdf' },
  { year: 2024, month: 'November',  pdf: '1520241114413.pdf' },
  { year: 2024, month: 'October',   pdf: '1520241014272.pdf' },
  { year: 2024, month: 'September', pdf: '1520240914131.pdf' },
  { year: 2024, month: 'August',    pdf: '1520240813990.pdf' },
  { year: 2024, month: 'July',      pdf: '1520240713849.pdf' },
  { year: 2024, month: 'June',      pdf: '1520240613708.pdf' },
  { year: 2024, month: 'May',       pdf: '1520240513567.pdf' },
  { year: 2024, month: 'April',     pdf: '1520240413426.pdf' },
  { year: 2024, month: 'March',     pdf: '1520240313285.pdf' },
  { year: 2024, month: 'February',  pdf: '1520240213144.pdf' },
  { year: 2024, month: 'January',   pdf: '1520240113003.pdf' },
  // 2023
  { year: 2023, month: 'December',  pdf: '1520231212862.pdf' },
  { year: 2023, month: 'November',  pdf: '1520231112721.pdf' },
  { year: 2023, month: 'October',   pdf: '1520231012580.pdf' },
  { year: 2023, month: 'September', pdf: '1520230912439.pdf' },
  { year: 2023, month: 'August',    pdf: '1520230812298.pdf' },
  { year: 2023, month: 'July',      pdf: '1520230712157.pdf' },
  { year: 2023, month: 'June',      pdf: '1520230612016.pdf' },
  { year: 2023, month: 'May',       pdf: '1520230511875.pdf' },
  { year: 2023, month: 'April',     pdf: '1520230411734.pdf' },
  { year: 2023, month: 'March',     pdf: '1520230311593.pdf' },
  { year: 2023, month: 'February',  pdf: '1520230211452.pdf' },
  { year: 2023, month: 'January',   pdf: '1520230111311.pdf' },
  // 2022
  { year: 2022, month: 'December',  pdf: '1520221211170.pdf' },
  { year: 2022, month: 'November',  pdf: '1520221111029.pdf' },
  { year: 2022, month: 'October',   pdf: '1520221010888.pdf' },
  { year: 2022, month: 'September', pdf: '1520220910747.pdf' },
  { year: 2022, month: 'August',    pdf: '1520220810606.pdf' },
  { year: 2022, month: 'July',      pdf: '1520220710465.pdf' },
  { year: 2022, month: 'June',      pdf: '1520220610324.pdf' },
  { year: 2022, month: 'May',       pdf: '1520220510183.pdf' },
  { year: 2022, month: 'April',     pdf: '1520220410042.pdf' },
  { year: 2022, month: 'March',     pdf: '152022031901.pdf' },
  { year: 2022, month: 'February',  pdf: '152022021760.pdf' },
  { year: 2022, month: 'January',   pdf: '152022011619.pdf' },
  // 2021
  { year: 2021, month: 'December',  pdf: '152021121478.pdf' },
  { year: 2021, month: 'November',  pdf: '152021111337.pdf' },
  { year: 2021, month: 'October',   pdf: '152021101196.pdf' },
  { year: 2021, month: 'September', pdf: '152021091055.pdf' },
  { year: 2021, month: 'August',    pdf: '152021080914.pdf' },
  { year: 2021, month: 'July',      pdf: '152021070773.pdf' },
  { year: 2021, month: 'June',      pdf: '152021060632.pdf' },
  { year: 2021, month: 'May',       pdf: '152021050491.pdf' },
  { year: 2021, month: 'April',     pdf: '152021040350.pdf' },
  { year: 2021, month: 'March',     pdf: '152021030209.pdf' },
  { year: 2021, month: 'February',  pdf: '152021020068.pdf' },
  { year: 2021, month: 'January',   pdf: '15202101927.pdf' },
  // 2020
  { year: 2020, month: 'December',  pdf: '15202012786.pdf' },
  { year: 2020, month: 'November',  pdf: '15202011645.pdf' },
  { year: 2020, month: 'October',   pdf: '15202010504.pdf' },
  { year: 2020, month: 'September', pdf: '1520200904363.pdf' },
  { year: 2020, month: 'August',    pdf: '1520200804222.pdf' },
  { year: 2020, month: 'July',      pdf: '1520200704081.pdf' },
  { year: 2020, month: 'June',      pdf: '1520200603940.pdf' },
  // 2019
  { year: 2019, month: 'May',       pdf: '1520190503799.pdf' },
  { year: 2019, month: 'April',     pdf: '1520190403658.pdf' },
  { year: 2019, month: 'March',     pdf: '1520190303517.pdf' },
  { year: 2019, month: 'February',  pdf: '1520190203376.pdf' },
  { year: 2019, month: 'January',   pdf: '1520190103235.pdf' },
  // 2018
  { year: 2018, month: 'December',  pdf: '1520181203094.pdf' },
  { year: 2018, month: 'November',  pdf: '1520181102953.pdf' },
  { year: 2018, month: 'October',   pdf: '1520181002812.pdf' },
  { year: 2018, month: 'September', pdf: '1520180902671.pdf' },
  { year: 2018, month: 'August',    pdf: '1520180802530.pdf' },
  { year: 2018, month: 'July',      pdf: '1520180702389.pdf' },
  { year: 2018, month: 'June',      pdf: '1520180602248.pdf' },
  { year: 2018, month: 'May',       pdf: '1520180502107.pdf' },
  { year: 2018, month: 'April',     pdf: '1520180401966.pdf' },
  { year: 2018, month: 'March',     pdf: '1520180301825.pdf' },
  { year: 2018, month: 'February',  pdf: '1520180201684.pdf' },
  { year: 2018, month: 'January',   pdf: '1520180101543.pdf' },
  // 2017
  { year: 2017, month: 'December',  pdf: '1520171201402.pdf' },
  { year: 2017, month: 'November',  pdf: '1520171101261.pdf' },
  { year: 2017, month: 'October',   pdf: '1520171001120.pdf' },
  { year: 2017, month: 'September', pdf: '1520170900979.pdf' },
  { year: 2017, month: 'August',    pdf: '1520170800838.pdf' },
  { year: 2017, month: 'July',      pdf: '1520170700697.pdf' },
  { year: 2017, month: 'June',      pdf: '1520170600556.pdf' },
  { year: 2017, month: 'May',       pdf: '1520170500415.pdf' },
  { year: 2017, month: 'April',     pdf: '1520170400274.pdf' },
  { year: 2017, month: 'March',     pdf: '1520170300133.pdf' },
  { year: 2017, month: 'February',  pdf: '152017020992.pdf' },
  { year: 2017, month: 'January',   pdf: '152017010851.pdf' },
  // 2016
  { year: 2016, month: 'December',  pdf: '152016120710.pdf' },
  { year: 2016, month: 'November',  pdf: '152016110569.pdf' },
  { year: 2016, month: 'October',   pdf: '152016100428.pdf' },
  { year: 2016, month: 'September', pdf: '152016090287.pdf' },
  { year: 2016, month: 'August',    pdf: '152016080146.pdf' },
  { year: 2016, month: 'July',      pdf: '15201607005.pdf' },
  { year: 2016, month: 'June',      pdf: '152016060864.pdf' },
  { year: 2016, month: 'May',       pdf: '152016050723.pdf' },
  { year: 2016, month: 'April',     pdf: '152016040582.pdf' },
  { year: 2016, month: 'March',     pdf: '152016030441.pdf' },
  { year: 2016, month: 'February',  pdf: '152016020300.pdf' },
  { year: 2016, month: 'January',   pdf: '152016010159.pdf' },
];

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  try {
    for (const item of newsletters) {
      const existing = await app.query('api::newsletter.newsletter').findOne({
        where: { year: item.year, month: item.month },
      });

      const data = {
        year: item.year,
        month: item.month,
        pdf: item.pdf,
        publishedAt: new Date(),
      };

      if (existing) {
        await app.query('api::newsletter.newsletter').update({
          where: { id: existing.id },
          data,
        });
        console.log(`Updated newsletter: ${item.month} ${item.year}`);
      } else {
        await app.query('api::newsletter.newsletter').create({
          data,
        });
        console.log(`Created newsletter: ${item.month} ${item.year}`);
      }
    }

    console.log('Newsletter seeding complete.');
  } catch (error) {
    console.error('Error seeding newsletters:', error);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
