import { Audit } from 'src/domain/audit/audit';

/**
 * Updates an object with new properties and adds an audit trail.
 * Merges the provided props into the data object, replacing any existing values.
 * Also adds the audit information to the data object.
 * @param props - The properties to update on the data object
 * @param data - The object to be updated
 * @param audit - The audit information to add to the data object
 * @returns The updated data object
 */
export const updateEntity = (
  props: Partial<any>,
  data: any,
  audit: Audit,
): any => {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      data[key] = props[key];
    }
  }
  data.audit = audit;
  return data;
};

export const extractDateFromISOString = (ISODate: string): string => {
  const [datePart] = ISODate.split(' ');
  return datePart;
};
