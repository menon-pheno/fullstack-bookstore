import _ from "lodash";

const slugify = (text) => _.kebabCase(text);

async function createUniqueSlug(Model, slug, count) {
  const slugConflict = await Model.findOne({ slug: `${slug}-${count}` }, "id");

  if (!slugConflict) {
    return `${slug}-${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1);
}

async function generateSlug(Model, name, filter = {}) {
  const candidateSlug = slugify(name);

  const slugConflict = await Model.findOne(
    { slug: candidateSlug, ...filter },
    "id"
  );

  if (!slugConflict) {
    return candidateSlug;
  }

  return createUniqueSlug(Model, candidateSlug, 1);
}

export default generateSlug;
