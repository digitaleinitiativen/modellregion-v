import * as GC from "./Constants.js";

/*

{
	type: "person|background",
	deltaX: X //delta from the last added object, could be 0
}

*/

const LEVEL = [
{
	type: "house",
	deltaX: GC.WIDTH - 200
},
{
	type: "person",
	deltaX: GC.WIDTH - 200
},
{
	type: "person",
	deltaX: 200
},
{ type: "end", deltaX: GC.WIDTH * 1.5 }
];

export default LEVEL;