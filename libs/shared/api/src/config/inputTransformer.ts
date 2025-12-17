import _ from "lodash";
import type { OpenAPIObject } from "openapi3-ts/oas30";

export default (api: OpenAPIObject): OpenAPIObject => {
  const schemas = _.get(api, "components.schemas");
  const paths = _.get(api, "paths");
  if (!schemas || !paths) return api;

  const renameMap = _.mapKeys(schemas, (_, key) => {
    const base = key.split(".").pop() || key;
    return base.replace(/[^A-Za-z0-9._-]/g, "_");
  });

  const renamePaths = _.mapKeys(paths, (_, key) => {
    const base = key.match(/^\/api\/v1\/(.+)$/);
    return base ? base[1] : key;
  });

  _.set(api, "components.schemas", renameMap);
  _.set(api, "paths", renamePaths);

  traverseRefs(api);
  return api;
};

function traverseRefs(obj: unknown) {
  if (_.isArray(obj)) return obj.forEach(traverseRefs);

  if (isObjectGuard(obj)) {
    if (
      _.has(obj, "$ref") &&
      _.isString(obj.$ref) &&
      obj.$ref.startsWith("#/components/schemas/")
    ) {
      const oldName = obj.$ref.replace("#/components/schemas/", "");
      const newName = oldName.split(".").pop() || oldName;
      obj.$ref = `#/components/schemas/${newName}`;
    }
    _.forEach(obj, traverseRefs);
  }
}

function isObjectGuard(data: unknown): data is Record<string, unknown> {
  return _.isPlainObject(data);
}
