import { MasterIconMap } from '../types';
import { iconMap } from '../index';

const map = iconMap as MasterIconMap;

function App() {
  return (
    <>
      {
        Object.keys(map).map((icon, index) => {
          const Icon = map[icon];
          return (
            <div key={index}>
              <Icon />
            </div>
          )
        })
      }
    </>
  )
}

export default App
