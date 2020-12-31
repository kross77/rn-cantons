import styled from 'styled-components';
import withDevice from './withDevice';
import withMultiSize from './withMultiSize';
import { applyProps, combineProps, separateLiteralToProps } from '../utils/literalUtils';
import { View } from "react-native";
export const multiplier = (v, addPx = true) => {
    v = withMultiSize(v);
    return withDevice(v, addPx);
};
const param = (name, paramName = undefined) => ({ [name]: value }) => {
    if (value !== null && value !== undefined) {
        return `${paramName || name}: ${multiplier(value)};`;
    }
};
const widthProps = separateLiteralToProps `
	${({ w }) => w === true ? 'width: 100%;' : w ? `width: ${multiplier(w)} ;` : undefined}
	${({ h }) => h === true ? 'height: 100%;' : h ? `height: ${multiplier(h)};` : undefined}
	${param('minHeight', 'min-height')}
	${param('minWidth', 'min-width')}
`;
const flexProps = separateLiteralToProps `
	${param('flexDirection', 'flex-direction')}
	${param('flex')}
	${param('flexWrap', 'flex-wrap')}
	${param('justify', 'justify-content')}
	${param('align', 'align-items')}
	${param('color', 'background-color')}
`;
const paddingProps = separateLiteralToProps `
	${param('pv', 'padding-vertical')}
	${param('ph', 'padding-horizontal')}
	${param('pt', 'padding-top')}
	${param('pr', 'padding-right')}
	${param('pl', 'padding-left')}
	${param('p', 'padding')}
`;
const marginProps = separateLiteralToProps `
	${param('mv', 'margin-vertical')}
	${param('mh', 'margin-horizontal')}
	${param('mt', 'margin-top')}
	${param('mr', 'margin-right')}
	${param('mb', 'margin-bottom')}
	${param('mb', 'margin-bottom')}
	${param('m', 'margin')}
`;
const borderProps = separateLiteralToProps `
	${param('r', 'border-radius')}
`;
const transformProps = separateLiteralToProps `
	${({ scale }) => scale && `transform: scale(${multiplier(scale)});`}
	${({ rotate }) => rotate && `transform: rotate(${multiplier(rotate)}deg);`}
`;
const positionProps = separateLiteralToProps `
	${param('zIndex', 'z-index')}
	${param('top')}
	${param('left')}
	${param('right')}
	${param('bottom')}
`;
const superProps = separateLiteralToProps `
	${({ relative }) => relative && `position: relative;`}
	${({ absolute }) => absolute && `position: absolute;`}
	${({ js }) => js && `justify-content: flex-start;`}
	${({ jc }) => jc && `justify-content: center;`}
	${({ je }) => je && `justify-content: flex-end;`}
	${({ jb }) => jb && `justify-content: space-between;`}
	${({ as }) => as && `align-items: flex-start;`}
	${({ ac }) => ac && `align-items: center;`}
	${({ ae }) => ae && `align-items: flex-end;`}
	${({ center }) => center && `justify-content: center;align-items: center;`}
	${({ wh }) => (wh) && `width: 100%; height: 100%;`}
	${({ f1 }) => f1 && `flex: 1;`}
	${({ f2 }) => f2 && `flex: 2;`}
	${({ f3 }) => f3 && `flex: 3;`}
	${({ f4 }) => f4 && `flex: 4;`}
	${({ row }) => row && `flex-direction: row`}
	${({ white }) => white && `background-color: white`}
	${({ hidden }) => hidden && `overflow: hidden;`}
	${({ black }) => black && `background-color: black`}
	${({ red }) => red && `background-color: red`}
	${({ blue }) => blue && `background-color: blue`}
	${({ green }) => green && `background-color: green`}
	${({ yellow }) => yellow && `background-color: yellow`}
	${({ oWhite }) => oWhite && `background-color: white; opacity: 0.5`}
	${({ oBlack }) => oBlack && `background-color: black; opacity: 0.5`}
	${({ oRed }) => oRed && `background-color: red; opacity: 0.5`}
	${({ oBlue }) => oBlue && `background-color: blue; opacity: 0.5`}
	${({ oGreen }) => oGreen && `background-color: green; opacity: 0.5`}
	${({ oYellow }) => oYellow && `background-color: yellow; opacity: 0.5`}
`;
const blockProps = combineProps(widthProps, flexProps, borderProps, transformProps, paddingProps, marginProps, positionProps, superProps);
const Block = applyProps(styled(View), blockProps);
export default Block;
//# sourceMappingURL=index.js.map