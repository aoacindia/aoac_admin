export const COMPANY_DOC_FIELDS = [
  {
    key: "panDocumentPath",
    folder: "administration",
    label: "PAN document",
    uploadKey: "panDocument",
  },
  {
    key: "tinDocumentPath",
    folder: "administration",
    label: "TIN document",
    uploadKey: "tinDocument",
  },
  {
    key: "certificateOfIncorporationPath",
    folder: "administration",
    label: "Certificate of Incorporation",
    uploadKey: "certificateOfIncorporation",
  },
  {
    key: "memorandumOfAssociationPath",
    folder: "administration",
    label: "Memorandum of Association (MOA)",
    uploadKey: "memorandumOfAssociation",
  },
  {
    key: "articlesOfAssociationPath",
    folder: "administration",
    label: "Articles of Association (AOA)",
    uploadKey: "articlesOfAssociation",
  },
] as const;

export type CompanyDocPathKey = (typeof COMPANY_DOC_FIELDS)[number]["key"];
