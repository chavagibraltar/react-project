import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha, Box } from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';

var handleChange = null;
export default function FilterDuration({ duration }) {
  //const [duration, setDuration] = React.useState();
 
  handleChange = (children) => {
    //setDuration(children)
    duration(children);
  };
  return (
    <Box sx={{ width: 300 }} className="duration">
      <label>Duration</label>
      <Slider max={200} defaultValue={200} slots={{ valueLabel: SliderValueLabel }} />
    </Box>
  );
}

function SliderValueLabel({ children }) {
  return (
    <span className="label">
      <div className="value">{children}</div>
      {handleChange(children)}
    </span>
  );
}

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
};

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B3',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
    opacity: 0.5;
  }
  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
  }
  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }
  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;
    &:hover{
      box-shadow: 0 0 0 4px ${alpha(
    theme.palette.mode === 'light' ? blue[200] : blue[300],
    0.3,
  )};
    }
    
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 5px ${alpha(
    theme.palette.mode === 'light' ? blue[200] : blue[300],
    0.5,
  )};
      outline: none;
    }
    & .label {
        font-family: IBM Plex Sans;
        font-weight: 600;
        font-size: 14px;
        background: unset;
        background-color: ${theme.palette.mode === 'light' ? blue[600] : blue[900]};
        width: 32px;
        height: 32px;
        padding: 0px;
        visibility: hidden;
        color: #fff;
        border-radius: 50% 50% 50% 0;
        position: absolute;
        transform: translate(-35%, -140%) rotate(-45deg) scale(0);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :hover .label {
        visibility: visible;
        transform: translate(-35%, -140%) rotate(-45deg) scale(1);
    }
    :hover .value {
        transform: rotate(45deg);
        text-align: center;
    }
    &.${sliderClasses.active} {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[600] : blue[300]};
      outline: none;
    }
  }
`,
);







// //////////////////////////////////////////
// //של נועה
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { styled, alpha, Box } from '@mui/system';
// import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';

// var handleChange = null;
// export default function FilterDuration({duration}) {
//       handleChange = (children) => {
//         duration(children);
//       };
//     return (
//     <Box sx={{ width: 300 }}>
//       <Slider max={200} slots={{ valueLabel: SliderValueLabel }} />
//     </Box>
//   );
// }
    
// function SliderValueLabel({ children}) {
//   return (
//     <span className="label">
//       <div className="value">{children}</div>
//       {handleChange(children)}
//     </span>
//   );
// }

// SliderValueLabel.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// const blue = {
//   100: '#DAECFF',
//   200: '#99CCF3',
//   400: '#3399FF',
//   300: '#66B2FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B3',
//   900: '#003A75',
// };

// const grey = {
//   50: '#F3F6F9',
//   100: '#E5EAF2',
//   200: '#DAE2ED',
//   300: '#C7D0DD',
//   400: '#B0B8C4',
//   500: '#9DA8B7',
//   600: '#6B7A90',
//   700: '#434D5B',
//   800: '#303740',
//   900: '#1C2025',
// };

// const Slider = styled(BaseSlider)(
//   ({ theme }) => `
//   color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
//   height: 6px;
//   width: 100%;
//   padding: 16px 0;
//   display: inline-block;
//   position: relative;
//   cursor: pointer;
//   touch-action: none;
//   -webkit-tap-highlight-color: transparent;

//   &.${sliderClasses.disabled} {
//     pointer-events: none;
//     cursor: default;
//     color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
//     opacity: 0.5;
//   }
//   & .${sliderClasses.rail} {
//     display: block;
//     position: absolute;
//     width: 100%;
//     height: 4px;
//     border-radius: 2px;
//     background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
//   }
//   & .${sliderClasses.track} {
//     display: block;
//     position: absolute;
//     height: 4px;
//     border-radius: 2px;
//     background-color: currentColor;
//   }
//   & .${sliderClasses.thumb} {
//     position: absolute;
//     width: 16px;
//     height: 16px;
//     margin-left: -6px;
//     margin-top: -6px;
//     box-sizing: border-box;
//     border-radius: 50%;
//     outline: 0;
//     border: 3px solid currentColor;
//     background-color: #fff;
//     &:hover{
//       box-shadow: 0 0 0 4px ${alpha(
//         theme.palette.mode === 'light' ? blue[200] : blue[300],
//         0.3,
//       )};
//     }
    
//     &.${sliderClasses.focusVisible} {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
//       outline: none;
//     }

//     &.${sliderClasses.active} {
//       box-shadow: 0 0 0 5px ${alpha(
//         theme.palette.mode === 'light' ? blue[200] : blue[300],
//         0.5,
//       )};
//       outline: none;
//     }
//     & .label {
//         font-family: IBM Plex Sans;
//         font-weight: 600;
//         font-size: 14px;
//         background: unset;
//         background-color: ${theme.palette.mode === 'light' ? blue[600] : blue[900]};
//         width: 32px;
//         height: 32px;
//         padding: 0px;
//         visibility: hidden;
//         color: #fff;
//         border-radius: 50% 50% 50% 0;
//         position: absolute;
//         transform: translate(-35%, -140%) rotate(-45deg) scale(0);
//         transition: transform 0.3s ease;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//     }
//     :hover .label {
//         visibility: visible;
//         transform: translate(-35%, -140%) rotate(-45deg) scale(1);
//     }
//     :hover .value {
//         transform: rotate(45deg);
//         text-align: center;
//     }
//     &.${sliderClasses.active} {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[600] : blue[300]};
//       outline: none;
//     }
//   }
// `,
// );
//////////////////////////////////////////
//שלי
