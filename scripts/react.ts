import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createPackage, deleteFilesRecursively, genCompFile, preprocessSvg } from './utils';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getReactExportTemplate = (svg: string, name: string) => {
  const propsHandle = svg.replace('<svg', '<svg\nstyle={ {fontSize: props.size, color: props.fill, rotate: props.rotate} }\n')

  const temp =
`const ${name} = (props: MasterIconProps) => {
  return (
    ${propsHandle}
  );
};
  
export default ${name};  
`;

return temp;
}

const genIndexFile = (path: string) => {
  const temp =
`
import * as iconMap from './map';
export { iconMap };

export * from './map';
export * from './types.d';
`;
  fs.writeFileSync(path, temp)
}

const genMappingFile = (
  mappingFilePath: string,
  svgSet: Set<string>
) => {
  const getMappingExportTemplate = (component: string) => {
    const svgName = path.basename(component, '.svg');
    const temp = `export { default as ${svgName} } from './icons/${svgName}.tsx';`
    return temp;
  }
  
  const mappingExportTemplate = Array.from(svgSet).map(getMappingExportTemplate).join('\n');

  fs.writeFileSync(mappingFilePath, mappingExportTemplate);
}

export const genReact = (sourcesSVGs: string[]) => {
  const reactConfig = {
    targetComponents: path.resolve(dirname, '../icons'),
    mapDirPath: path.resolve(dirname, '../map.ts'),
    indexDirPath: path.resolve(dirname, '../index.ts')
  }
  
  const { targetComponents, mapDirPath, indexDirPath } = reactConfig;
  
  [targetComponents, mapDirPath, indexDirPath].forEach(deleteFilesRecursively);

  const iconsSet = new Set<string>();
  
  for (const sourcesSVG of sourcesSVGs) {
    fs.readdirSync(sourcesSVG).forEach((icon) => iconsSet.add(icon));

    const packageDir = createPackage(targetComponents);
    
    genCompFile(sourcesSVG, packageDir, (sourcePath, targetDir) => {
      const sourceFileName = path.basename(sourcePath, '.svg');
      const targetPath = path.resolve(targetDir, `${sourceFileName}.tsx`);
    
      const sourceContent = preprocessSvg(fs.readFileSync(sourcePath, 'utf-8'));
      const reactString = getReactExportTemplate(sourceContent, sourceFileName);
    
      fs.writeFileSync(targetPath, reactString);
    })
  }

  genMappingFile(mapDirPath, iconsSet);
  genIndexFile(indexDirPath)  
}
