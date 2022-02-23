const _ = require('lodash');

const slugify = (text) => _.kebabCase(text);

async function generateSlug(Model, name, filter = {}) {
  const origSlug = slugify(name);

  const user = await Model.findOne({ slug: origSlug, ...filter }, 'id');

  if (!user) {
    return origSlug;
  }

  return null;
}

module.exports = generateSlug;
