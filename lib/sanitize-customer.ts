type CustomerWithPassword = {
  password?: string | null;
  [key: string]: unknown;
};

export function omitCustomerPassword<T extends CustomerWithPassword>(
  customer: T
): Omit<T, "password"> {
  const { password: _password, ...safe } = customer;
  return safe;
}
