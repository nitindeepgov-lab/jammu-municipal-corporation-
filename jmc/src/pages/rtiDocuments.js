export const rtiDocuments = [
  {
    slug: "4-1-b-i",
    clause: "4(1)(b)(i)",
    desc: "Particulars of organisation, functions and duties",
    url: "https://jmc.jk.gov.in/forms/sec4bi.pdf",
  },
  {
    slug: "4-1-b-iii",
    clause: "4(1)(b)(iii)",
    desc: "Procedure followed in the decision-making process, including channels of supervision and accountability",
    url: "https://jmc.jk.gov.in/forms/sec4b3.pdf",
  },
  {
    slug: "4-1-b-iv-vi",
    clause: "4(1)(b)(iv-vi)",
    desc: "Norms set for the discharge of functions; rules, regulations, instructions, manuals and records held",
    to: "/rti/disclosure-4-1-b-iv-vi",
  },
  {
    slug: "4-1-b-vii-viii",
    clause: "4(1)(b)(vii-viii)",
    desc: "Statement of boards, councils and committees; minutes of meetings that are accessible to the public",
    url: "https://jmc.jk.gov.in/forms/sec4vii%26viii.pdf",
  },
  {
    slug: "4-1-b-ix",
    clause: "4(1)(b)(ix)",
    desc: "Directory of officers and employees",
    url: "https://jmc.jk.gov.in/contactus.html",
  },
  {
    slug: "4-1-b-xi",
    clause: "4(1)(b)(xi)",
    desc: "Budget allocated to each agency including plans, proposed expenditures and disbursements made",
    url: "https://jmc.jk.gov.in/forms/budget.pdf",
  },
  {
    slug: "4-1-b-xii-xiii",
    clause: "4(1)(b)(xii-xiii)",
    desc: "Manner of execution of subsidy programmes; recipients of concessions, permits or authorisations granted",
    url: "https://jmc.jk.gov.in/forms/sec4xii%26xiii.pdf",
  },
  {
    slug: "4-1-b-xiv",
    clause: "4(1)(b)(xiv)",
    desc: "Details of information available to or held in electronic form",
    url: "https://jmc.jk.gov.in/forms/sec4xiv.pdf",
  },
  {
    slug: "4-1-b-xv",
    clause: "4(1)(b)(xv)",
    desc: "Particulars of facilities available to citizens for obtaining information",
    url: "https://jmc.jk.gov.in/forms/sec4xv.pdf",
  },
  {
    slug: "4-1-b-xvi",
    clause: "4(1)(b)(xvi)",
    desc: "Names, designations and other particulars of Public Information Officers",
    url: "https://jmc.jk.gov.in/forms/sec4xvi.pdf",
  },
  {
    slug: "rti-act-2005",
    clause: "RTI ACT 2005",
    desc: "The Right to Information Act, 2005 - Full document",
    url: "/uploads/rti/rti-act-2005.pdf",
  },
];

export const rtiDocumentMap = rtiDocuments.reduce((acc, doc) => {
  acc[doc.slug] = doc;
  return acc;
}, {});
