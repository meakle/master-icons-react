import { fileURLToPath } from "url";
import path from "path";
import { createPackage, deleteFilesRecursively, genConfigJson } from "./utils";
import { genReact } from "./react";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const iconConfig = path.resolve(dirname, '../packages/svg/config.json');
const iconTarget = path.resolve(dirname, '../packages/svg/icons');

const iconCustomConfig = path.resolve(dirname, '../packages/svg/config.custom.json');
const iconCustomTarget = path.resolve(dirname, '../packages/svg/__custom');

deleteFilesRecursively(iconTarget);
deleteFilesRecursively(iconCustomTarget);

createPackage(iconTarget);
createPackage(iconCustomTarget);

genConfigJson(iconConfig, iconTarget)
genConfigJson(iconCustomConfig, iconCustomTarget)

genReact([iconTarget, iconCustomTarget]);
