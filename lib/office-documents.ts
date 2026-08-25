export const OFFICE_FIXED_DOC_TYPES = [
  {
    type: "RENT_AGREEMENT",
    label: "Rent Agreement",
  },
  {
    type: "GST_CERTIFICATE",
    label: "GST Certificate",
  },
  {
    type: "UTILITY_BILL",
    label: "Utility Bill",
  },
] as const;

export type OfficeFixedDocType = (typeof OFFICE_FIXED_DOC_TYPES)[number]["type"];

export const OFFICE_CUSTOM_DOC_TYPE = "CUSTOM" as const;

export type OfficeDocType = OfficeFixedDocType | typeof OFFICE_CUSTOM_DOC_TYPE;

export const OFFICE_DOC_FOLDER = "offices";

export function isOfficeDocType(value: string): value is OfficeDocType {
  if (value === OFFICE_CUSTOM_DOC_TYPE) return true;
  return OFFICE_FIXED_DOC_TYPES.some((d) => d.type === value);
}

export function labelForOfficeDocType(type: string, customName?: string | null) {
  if (type === OFFICE_CUSTOM_DOC_TYPE) {
    return customName?.trim() || "Custom document";
  }
  const found = OFFICE_FIXED_DOC_TYPES.find((d) => d.type === type);
  return found?.label || type;
}
