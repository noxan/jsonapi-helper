// credits http://stackoverflow.com/questions/8955533/javascript-jquery-split-camelcase-string-and-add-hyphen-rather-than-space

export default function(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
