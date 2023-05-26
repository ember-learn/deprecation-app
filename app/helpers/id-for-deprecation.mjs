

export function idForDeprecation(id) {

  let idString = id;
  idString = idString.replace(/\s+/g, '');
  let replacedIdString = idString.replace(/\.|,|:/g, '-');
  return `${replacedIdString}`;
}
